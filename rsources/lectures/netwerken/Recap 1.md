# Recap 1

[TOC]

## Segmenting

Segmenting has the following benefits.

* Different conversations can be interleaved
* Increased reliability of network communications
  * If a packet is not recieved, you can just send the lost data and now the whole file.
  * Fault Tolerance: if a server is shut down while transfering data, only a part of the data is lost and can easaly be resend.

But also has some disadvantages.

* Increased level of complexity

## Network layers (LAN, WLAN, MAN, WAN)

![Network layers]( https://upload.wikimedia.org/wikipedia/commons/7/70/Data_Networks_classification_by_spatial_scope.png )

| Layer | Full name                   | Description                                                  |
| ----- | --------------------------- | ------------------------------------------------------------ |
| LAN   | Local Area Network          | A small network consisting of a small number of end devices. Think of a home or school network. |
| MAN   | Metropolitan Area Network   | A network about the size of a city consisting of multiple LAN networks connected to each other. |
| WAN   | Wide Area Network           | A network that connects almost all public network to each other creating one giant network. |
| WLAN  | Wireless Local Area Network | Connects multiple devices to each other using wireless technology, creating a LAN network. |

## Data Encapsulation

A `Transport`, `Network` and `Frame` header are added to the data.

| Data                                                         | What is added                    | Model Layer     | Type    |
| ------------------------------------------------------------ | -------------------------------- | --------------- | ------- |
| Data                                                         | -                                | -               | Data    |
| Transport Header + Data                                      | Src and Dest port of application | Application     | Segment |
| Network Header + Transport Header + Data                     | Src and Dest IP Address          | Network         | Packet  |
| Frame Header + Network Header + Transport Header + Frame Trailer | Src and Dest MAC Address         | Transport layer | Frame   |

## Transportation of Data (transport layer)

The `transport layer` has the following responsibilities:

* Track individual conversations
* Segment Data and Reassemble Segments.
* Identify yhe Applications

### Transport Layer Reliability

* Two protocols provided: TCP and UDP
* TCP supports reliability while UDP doesn't

More reading about [TCP](./Chapter 9.html#tcp) and [UDP](./Chapter 9.html#udp) can be found in [chapter 9](./Chapter 9.html).

## How a Host Routes

A computer has a `routing table` where it can find where to find other devices. It shows what to send within the network and what to send to the router to be send to an other network.

## Router Routing Tables

It contains a list of other routers where it can send data to to get data to the destination.

## IPv4

An example IPv4 address could be `192.168.10.10`. It consists of 4 parts seperated by an `.`. These are called `octets`. One `octet` is 8 bits long. You can rewrite an IP Address to bits:

| 192      | 168      | 10       | 10       |
| -------- | -------- | -------- | -------- |
| 11000000 | 10101000 | 00001010 | 00001010 |

A subnet mask can be something like `255.255.255.0`. It shows show what part of the IP address is used for the network and which for the hosts.

## IPv6

A IPv6 address is 128 bits long, consisting of 8 parts of 16 bits called `hextets`. You write IPv6 addresses using hexadecimals. An example of an IPv6 address would be: `2001:0DB8::1111::`. To learn more about IPv6 notation, you can check [wikipedia](https://en.wikipedia.org/wiki/IPv6), and spicifically about writing them can be found [here](https://en.wikipedia.org/wiki/IPv6#Address_representation).

A address that starts with `2001` it is used to access the internet. `FE80` is a link local address is only used to talk to devices within the same network.

The first three hextets are used as a Global Routing Prefix. The 4th hextet is used for subnetting and the last 4 hextets are used for interfaces (hosts).

| Hextet   | 1    | 2    | 3    | 4          | 5          | 6          | 7          | 8          |
| -------- | ---- | ---- | ---- | ---------- | ---------- | ---------- | ---------- | ---------- |
| Used for | GRP  | GRP  | GRP  | Subnetting | Interfaces | Interfaces | Interfaces | Interfaces |

## MAC Address

## MAC Adress Table (CAM)

A table has this table to know where to send what. It is automatically build by monitoring network trafic.

## ARP

When an ARP request is send, it sends a broadcast with an IP Address. The PC that has that IP Address sends an response with the MAC address. More information about ARP can be found in [chapter 5](./Chapter 5.html).