#include <ArduinoJson.h>




#include <StaticThreadController.h>
#include <Thread.h>
#include <ThreadController.h>

ThreadController controller = ThreadController();
Thread subThread = Thread();
Thread pubThread = Thread();

#include <PubSubClient.h>

#include <WiFiEsp.h>
#include <WiFiEspClient.h>
#include <WiFiEspUdp.h>

#include <SoftwareSerial.h>
SoftwareSerial Serial1(6,7); //RX 6, TX 7

#include <DHT_U.h>
#include <DHT.h>

#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);

#define DHTTYPE DHT11
#define DHTPIN 8
DHT dht( DHTPIN ,DHTTYPE );


char ssid[] = "MoonHome";
char pass[] = "ans619092rkd";
int status = WL_IDLE_STATUS;

WiFiEspClient wifiClient;

PubSubClient mqttClient(wifiClient);

int time = 0;
int redPin = 2;

//키트에서 제공하는 코드이용!
int dust_sensor = A0;   // 미세먼지 핀 번호
float dust_value = 0;  // 센서에서 입력받은 미세먼지 값

int sensor_led = 12;      // 미세먼지 센서 안에 있는 적외선 led 핀 번호
int sampling = 280;    // 적외선 led를 키고, 센서값을 읽어들여 미세먼지를 측정하는 샘플링 시간
int waiting = 40;    
float stop_time = 9680;   // 센서를 구동하지 않는 시간

void reconnect() {
  // Loop until we're reconnected
  while (!mqttClient.connected()) {
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Connecting to");
    lcd.setCursor(4,1);
    lcd.print("MQTT Broker");
    
    // Attempt to connect
    if (mqttClient.connect("HomeClient")) {
      lcd.clear();
      lcd.setCursor(0,0);
      lcd.print("Connected to");
      lcd.setCursor(4,1);
      lcd.print("MQTT Broker");
      mqttClient.subscribe("home/control/#", 1);
    } else {
      lcd.clear();
      lcd.setCursor(0,0);
      lcd.print("Connecting Fail");
      lcd.setCursor(0,1);
      lcd.print("RC after 5sec");
      delay(5000);
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  char unit = topic[13];

  switch (unit)
  {
  case '1':
    char sign = (char) payload[0];
    if( sign == '1'){
      analogWrite(redPin, 255);
    }else if( sign == '0'){
      analogWrite(redPin, 0);
    }
    
    break;
  
  default:
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Unknow Signal");
    break;
  }

}



void setup(){
  //LCD 초기화
  lcd.init();
  lcd.backlight();
  Serial.begin(9600);

  lcd.setCursor(0,0);
  lcd.print("HomeSensor is");
  lcd.setCursor(0, 1);
  lcd.print("    initializing");

  // Esp8266과 통신을 위한 SoftwareSerial
  Serial1.begin(9600);
  WiFi.init(&Serial1);

  //온도센서
  dht.begin();

  pinMode(redPin, OUTPUT);
  //미세먼지 사용핀
  pinMode(sensor_led,OUTPUT);
  // attempt to connect to WiFi network
  while ( status != WL_CONNECTED) {
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Connecting");
    lcd.setCursor(7, 1);
    lcd.print("to WI-FI");
    status = WiFi.begin(ssid, pass);
  }
  delay(1000);
  lcd.clear();
  lcd.setCursor(3,0);
  lcd.print("WI-FI OK!");
  
  delay(2000);
  
  mqttClient.setServer("192.168.12.11", 1883);
  mqttClient.setCallback(callback);
  reconnect();

  delay(1000);

  //스레드 설정
  subThread.onRun(mqttClient.loop);
  pubThread.onRun(mqttPubLoop);
  pubThread.setInterval(10000);
  
}

void loop()
{
  
  if( !mqttClient.connected() ){
    reconnect();
  }
  if( subThread.shouldRun() ){
    subThread.run();
  }
  if( pubThread.shouldRun()){
    pubThread.run();
  }

}



void mqttPubLoop(){
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  DynamicJsonDocument jsonDoc(128);
  jsonDoc["temp"] = t;
  jsonDoc["humi"] = h;

  digitalWrite(sensor_led, LOW);    // LED 켜기
  delayMicroseconds(sampling);   // 샘플링해주는 시간. 

  dust_value = analogRead(dust_sensor); // 센서 값 읽어오기
  
  delayMicroseconds(waiting);  // 너무 많은 데이터 입력을 피해주기 위해 잠시 멈춰주는 시간. 

  digitalWrite(sensor_led, HIGH); // LED 끄기
  delayMicroseconds(stop_time);   // LED 끄고 대기  

  float d = ((dust_value * (5.0 / 1024)) - 0.15) * 1000;    // 미세먼지 값 계산 (ug/m^3 단위) 
  jsonDoc["dust"] = d;

  char data[50];
  
  serializeJson(jsonDoc, data);
  
  mqttClient.publish("home/status", data);

  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Sensonig &");
  lcd.setCursor(0, 1);
  lcd.print("Sending data-");
  lcd.print(time);
  
  if( time >= 10){
    lcd.noBacklight();
  }else{
    time++;
  }
}

