# Hackathon Texas Instruments

This repo contains part of our results of the 2020 Texas Instruments Hackathon with the RSLK Robot. A demo video can be found [here](https://youtu.be/1a3sVjHn6TE).

## What does it do?

We used an Amazon Alexa with a custom Alexa skill to controll the RSLK robot and deliver things without physical contact.

## How does it work?

A custom Alexa Skill updates a realtime firebase with the leatest heared command. On the Robot an ESP32 pulls the information of the firebase and sends it via serial to the MSP432P401. The MSP432P401 parses the commands and decides what to do (e.g. drive into the kichen or turn around).
In order to get high enough driving accuracy we built a closed loop controller with the encoder on the RSLK for with we had to update the supplied RSLK libaries.

Furthermore we implmented an pathfinding algorithm on the MSP432P401R and mapped our apartment, which would allow set our destination freely. But due to time constrains we were not able to combine it with the rest of the code.
