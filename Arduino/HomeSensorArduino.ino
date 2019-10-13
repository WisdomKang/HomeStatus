#include <ArduinoJson.h>

#include <StaticThreadController.h>
#include <Thread.h>
#include <ThreadController.h>
Thread sendDataProccess;

#include <DHT_U.h>
#include <DHT.h>

#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);

#define DHTTYPE DHT11
#define DHTPIN 8
DHT dht( DHTPIN ,DHTTYPE );

#define RESETPIN 2
#define LEDPIN 3
//키트에서 제공하는 코드이용!
int dust_sensor = A0;   // 미세먼지 핀 번호
float dust_value = 0;  // 센서에서 입력받은 미세먼지 값

int sensor_led = 12;      // 미세먼지 센서 안에 있는 적외선 led 핀 번호
int sampling = 280;    // 적외선 led를 키고, 센서값을 읽어들여 미세먼지를 측정하는 샘플링 시간
int waiting = 40;    
float stop_time = 9680;   // 센서를 구동하지 않는 시간

void setup(){
  //LCD 초기화
  lcd.init();
  lcd.backlight();

  lcd.setCursor(0,0);
  lcd.print("HomeSensor is");
  lcd.setCursor(0, 1);
  lcd.print("    initializing");

  delay(500);

  // Esp8266과 Serial통신
  Serial.begin(115200);

  //온도센서
  dht.begin();

  //미세먼지 센서 사용핀
  pinMode(sensor_led,OUTPUT);

  //ESP RESTART!
  pinMode(RESETPIN, OUTPUT);
  digitalWrite(RESETPIN, HIGH);
  delay(500);
  digitalWrite(RESETPIN, LOW);
  delay(500);
  digitalWrite(RESETPIN, HIGH);
  
  //컨트롤 명령 핀
  pinMode(LEDPIN,OUTPUT);

  // attempt to connect to WiFi network
  
  delay(500);

  //스레드 설정
  sendDataProccess.onRun(SendData);
  sendDataProccess.setInterval(60000);

  delay(500);
}

void loop()
{
  
  if( sendDataProccess.shouldRun() ){
    sendDataProccess.run();
  }
  
}

//WIFI 상태 LCD표기
void wifiStatusDisplay(char status){
  if( status == '1'){
    lcd.clear();
    lcd.setCursor(3,0);
    lcd.print("WI-FI OK!");
  }else if( status == '0'){
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("WI-FI Conect Fail.");
  }
}

//MQTT BORKER 접속 상태 표기
void mqttStatusDisplay(char status){
  if( status == '1'){
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Connected to");
    lcd.setCursor(4,1);
    lcd.print("MQTT Broker");
  }else if( status == '0'){
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("MQTT Connect");
    lcd.setCursor(9,1);
    lcd.print("FAILED");
  }

}

void commandRecive(char* data){
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Recieve MSG");
    lcd.setCursor(0,1);
    lcd.print("->");
    lcd.print(data);
    if( data[2] == '1'){
      digitalWrite(LEDPIN, HIGH);
    }else if( data[2] == '0'){
      digitalWrite(LEDPIN, LOW);
    }
}

//아래 함수명으로 작성시 Serial통신으로 데이터 수신시 호출됨
void serialEvent(){
  
  char readData[3];
  int sizeOfSerial = Serial.readBytes(readData, 3);
  //Serial통신시 Buffer문제인지 쓰레기 값이 남아서 들어오는데 필요한 부분만 얽어도 남은 부분이 읽히므로
  //읽어서 쓰레기 값을 버림~!
  //3필요한 3개만 읽고 버림
  Serial.flush();
  while( Serial.available() > 0){
    Serial.read();
  }
  

  switch (readData[0])
  {
  case '0':
    wifiStatusDisplay(readData[1]);
    break;
  case '1':
    mqttStatusDisplay(readData[1]);
    break;
  case '3':
    commandRecive(readData);
    break;
  
  default:
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Trash Value!!");
    lcd.setCursor(0,1);
    lcd.print(readData);
    break;
  }
}


void SendData(){
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

  float d = ((dust_value * (5.0 / 1024)) - 0.6) * 1000;    // 미세먼지 값 계산 (ug/m^3 단위) 
  jsonDoc["dust"] = d;

  char data[50];
  
  serializeJson(jsonDoc, data);

  Serial.print(data);

}

