#include <stdlib.h>
#include "Energia.h"
#include "Encoder.h"

/* Variables used in the ISR should be volatile */
volatile int32_t enc_left_cnt = 0;
volatile int32_t enc_right_cnt = 0;
volatile uint8_t enc_left_wheel_dir = 0;
volatile uint8_t enc_right_wheel_dir = 0;

/* Pins used by the encoder */
uint8_t _era_pin;
uint8_t _erb_pin;
uint8_t _ela_pin;
uint8_t _elb_pin;


void triggerLeftEncoder() {
	enc_left_wheel_dir = digitalRead(_ela_pin);

	if (enc_left_wheel_dir == 0) {
		enc_left_cnt++;
	}
	else{
		enc_left_cnt--;
	}
}

void triggerRightEncoder() {
	enc_right_wheel_dir = digitalRead(_era_pin);

	if (enc_right_wheel_dir == 0) {
		enc_right_cnt++;
	}
	else {
		enc_right_cnt--;
	}
}

void setupEncoder(uint8_t ela_pin, uint8_t elb_pin, uint8_t era_pin, uint8_t erb_pin) {
	_era_pin = era_pin;
	_erb_pin = erb_pin;
	_ela_pin = ela_pin;
	_elb_pin = elb_pin;

	/* Encoder drives pins high during pulse so by default they should be pulled low */
	pinMode(_ela_pin, INPUT_PULLDOWN );
	pinMode(_elb_pin, INPUT_PULLDOWN );
	pinMode(_era_pin, INPUT_PULLDOWN );
	pinMode(_erb_pin, INPUT_PULLDOWN );

	/* Only count the rising edge of the encoder */
	attachInterrupt(digitalPinToInterrupt(_erb_pin),triggerRightEncoder,RISING);
	attachInterrupt(digitalPinToInterrupt(_elb_pin),triggerLeftEncoder,RISING);
}

uint32_t getEncoderRightCnt() {
	return enc_right_cnt;
}

uint32_t getEncoderLeftCnt() {
	return enc_left_cnt;
}

void resetLeftEncoderCnt() {
	enc_left_cnt = 0;
}

void resetRightEncoderCnt() {
	enc_right_cnt = 0;
}

uint8_t getLeftWheelDir() {
	return enc_left_wheel_dir;
}
uint8_t getRightWheelDir() {
	return enc_right_wheel_dir;
}