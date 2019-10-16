#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Update these with values suitable for your network.

const char* ssid = "MoonHome";
const char* password = "ans619092rkd";
const char* mqtt_server = "192.168.12.11";

const char* mqtt_user = "homeDevice";
const char* mqtt_pswd = "home4975";

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {

  delay(10);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("00");
  }
  Serial.print("01");

  delay(5000);
}

void callback(char* topic, byte* payload, unsigned int length) {
  //보내려는 문자열의 길이보다 1 길게 설정하지 않으면 끝을 맺는 문자를 넣지 못하므로 예상치 않은 결과발생
    char data[4];
    data[0] = '3';
    data[1] = topic[13];
    data[2] = (char)payload[0];
    data[3] = '\0';

    Serial.print(data);
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    delay(1000);
    if (client.connect(mqtt_user, mqtt_user, mqtt_pswd)) {
      client.publish("home/status","esp connected");
      client.subscribe("home/control/#");
      Serial.print("11");
    } else {
      Serial.print("10");
    }
  }

  delay(1000);
}

void setup() {
  Serial.begin(115200);
  delay(5000);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  if( Serial.available() ){
    String jsonDataStr = "";
    jsonDataStr = Serial.readString();
    client.publish("home/status", jsonDataStr.c_str());
  }
  client.loop();

}