
# 🧠 NeuroComm - Silent Communication Helmet

This repository presents the design and implementation of a brain-computer interface (BCI)-based Silent Communication Helmet. It enables covert, hands-free communication using EEG signals and machine learning. Designed for first responders, soldiers, and individuals with speech impairments, the system decodes brainwave patterns into actionable commands like “Yes,” “No,” “Forward,” “Backward,” and “Alert,” and transmits them wirelessly using low-cost RF modules.

---

## 📑 Contents

- [🧾 Introduction](https://github.com/mohanrajs2006git/NeuroComm#-introduction)
- [🧭 Overview](https://github.com/mohanrajs2006git/NeuroComm#-overview)
- [🎯 Goals and Objectives](https://github.com/mohanrajs2006git/NeuroComm#-goals-and-objectives)
- [👤 Target Users](https://github.com/mohanrajs2006git/NeuroComm#-target-users)
- [🚀 Key Features](https://github.com/mohanrajs2006git/NeuroComm#-key-features)
- [🛠️ Technical Approach](https://github.com/mohanrajs2006git/NeuroComm#-technical-approach)
- [📡 EEG Signal Flow](https://github.com/mohanrajs2006git/NeuroComm#-eeg-signal-flow)
- [📦 Components & Bill of Materials](https://github.com/mohanrajs2006git/NeuroComm#-components--bill-of-materials)
- [📊 Block Diagram](https://github.com/mohanrajs2006git/NeuroComm#-block-diagram)
- [🔌 Pin Connections](https://github.com/mohanrajs2006git/NeuroComm#-pin-connections)
- [🖼️ Project Images](https://github.com/mohanrajs2006git/NeuroComm#-project-images)
- [🚀 Getting Started](https://github.com/mohanrajs2006git/NeuroComm#-getting-started)
- [👥 Contributors](https://github.com/mohanrajs2006git/NeuroComm#-contributors)
- [🎓 Acknowledgements](https://github.com/mohanrajs2006git/NeuroComm#-acknowledgements)
- [📬 Contact Information](https://github.com/mohanrajs2006git/NeuroComm#-contact-information)

---

## 🧾 Introduction

The **Silent Communication Helmet** is an innovative Brain-Computer Interface (BCI) system that enables silent, hands-free communication by interpreting brainwave signals (EEG) and converting them into actionable commands. This system is designed for use in environments where verbal or gestural communication is either dangerous, restricted, or impractical—such as in military operations, emergency rescue missions, or for individuals with speech impairments.

By leveraging real-time EEG signal acquisition, signal processing, and deep learning models, the helmet can decode specific mental patterns into commands like "Yes", "No", "Forward", "Backward", and "Alert". These commands are then wirelessly transmitted to a teammate or base station, allowing seamless, covert communication without speaking or moving.

---
## 🧭 Overview

The Silent Communication Helmet system begins with EEG signal acquisition using the BioAmp Band, a 2-channel biosignal sensor that captures brainwave activity from the user’s scalp. These raw EEG signals, typically in the microvolt range, are first amplified by the AD620 instrumentation amplifier. To remove unwanted noise and interference, a 50 Hz notch filter is applied to eliminate power-line noise, followed by a bandpass filter (0.5–40 Hz) to retain only the relevant Alpha and Beta wave frequencies that correspond to conscious mental activity.

The filtered EEG signals are then transmitted to a Python environment via an ESP32 microcontroller. These signals are fed into a pre-trained machine learning model—either an MSTCNN or LSTM architecture—that classifies the patterns into discrete commands such as “Yes,” “No,” “Forward,” “Backward,” and “Alert.” Once classified, the command is encoded and wirelessly transmitted through a 433 MHz RF transmitter module. A corresponding RF receiver module on the teammate's side decodes the message.

The received command is then displayed or signaled via an output interface, which may include LEDs, an OLED display, or audio feedback through a MAX985A-based speaker system. This real-time communication loop allows users to send and receive commands silently and efficiently, even in situations where traditional communication methods are not possible.

---

## 🎯 Goals and Objectives

1. Enable non-verbal, brainwave-based command transmission.
2. Improve communication in defense, emergency, or disabled care.
3. Use low-cost, open-source components and platforms.
4. Maintain accuracy with signal filtering and ML confidence thresholds.

---

## 👤 Target Users

- Military and defense personnel
- First responders in hazardous zones
- Individuals with speech or motor impairments
- Human-machine interface researchers

---

## 🚀 Key Features

- EEG signal acquisition using BioAmp Band
- Signal processing with analog filters
- Brainwave classification using MSTCNN/LSTM
- Wireless command transmission via RF
- Output via LED, OLED, or speaker
- Modular and scalable design
- Optional IoT logging and dashboard integration

---
## 📡 EEG Signal Flow
1. EEG Signal Acquisition
- Brainwaves are captured via an EEG headband worn inside the helmet.

2. Signal Conditioning & ADC
- Signals are amplified via AD620, passed through Notch + Bandpass filters (0.5–40 Hz),
then digitized for further processing in Python.

3. AI/ML Signal Processing & Classification
       
- Extracted EEG features are processed using trained ML models (e.g., LSTM/MSTCNN),
which classify signals into commands: Yes, No, Forward, Backward, Alert.

4. Wireless RF Transmission
       
- The classified command (e.g., CMD:ALERT) is encoded and transmitted via a 433 MHz RF module
to the teammate’s helmet or base receiver.

5. Receiver Unit (Soldier/Device)
       
- The command is received and displayed via OLED/LED/speaker output,
enabling a silent response without the need for speech or gestures.

## 🛠️ Technical Approach

### 🧑‍💻 Programming Language
- **Python 3.9.6** – Used for EEG signal acquisition, processing, and ML classification

### 📚 Libraries Used
- **Matplotlib** – Visualization and plotting of EEG signals  
- **Pandas** – Data cleaning, transformation, and analysis  
- **Scikit-learn** – Machine learning (classifiers, data splitting, etc.)  
- **Click** – CLI tool for running Python models interactively  

### ⚙️ Framework
- **TensorFlow 2.3.0**
  - Deep learning and machine learning framework  
  - Model training and evaluation (LSTM / MSTCNN)  
  - Supports deployment-ready inference models  

---

### 🔧 Hardware Components
- **BioAmp Band (2-channel)** – EEG signal acquisition  
- **BioAmp Band Cable V3** – Connection between sensor and amplifier  
- **AD620 Instrumentation Amplifier** – Signal amplification  
- **ESP32 Microcontroller** – Serial communication + output control  
- **RF433 MHz Transmitter & Receiver Module** – Wireless communication
---
## 📦 Components & Bill of Materials

| Component             | Quantity | Estimated Cost (INR) |
|----------------------|----------|-----------------------|
| BioAmp Band (2-ch)   | 1        | ₹1,900                |
| AD620 Amplifier       | 1        | ₹200                  |
| LM358 Op-Amp          | 2        | ₹30                   |
| ESP32 Dev Board       | 1        | ₹350                  |
| 433 MHz RF Tx/Rx      | 1 pair   | ₹200                  |
| OLED Display (0.96")  | 1        | ₹160                  |
| MAX985A Speaker Amp   | 1        | ₹150                  |
| Jumper Wires, Breadboard | 1 set | ₹100                  |
| Battery Pack / USB    | 1        | ₹100                  |
| Helmet (Head Mount)   | 1        | ₹300                  |
| **Total**             | —        | **~₹3,500**           |
> 💡 Prices are approximate and may vary by vendor. Components are chosen for cost-efficiency and availability.

---

## 📊 Block Diagram

![Image](https://github.com/user-attachments/assets/4656542f-58e0-433d-a315-0b31e672aed8)



---

## 🔌 Pin Connections

| Module        | ESP32 Pin |
|---------------|-----------|
| EEG Output    | GPIO36    |
| RF Tx (Data)  | GPIO17    |
| OLED Display  | I2C (21/22) |
| Speaker (MAX985A) | GPIO25 |
| RF Rx (Data)  | GPIO16    |

---

## 🖼️ Project Images

![Image](https://github.com/user-attachments/assets/5a369151-93ef-4d09-b1e4-89f6ae337d66)


## 👥 Contributors

- Rithish K 
- Mohan Raj S
- Nashrin Fathima K
- Mounish V

---

## 🎓 Acknowledgements

- Mr. Vignesh A, Research Scholar, Sri Eshwar College of Engineering

---

## 📬 Contact Information

- Rithish K – [rithish.cnr@gmail.com](mailto:rithish.cnr@gmail.com)  
- Institution: Sri Eshwar College of Engineering  
- Duration: May – July 2025  
>>>>>>> faada70e7ae0d5610701f45818f37392435b3c52
