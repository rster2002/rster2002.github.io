# Chapter 6 - Network Layer Protocols

[TOC]



## Network Layers in Communications

A package consists of:

* Source address
* Destination address
* Sequence number

Network layer is on Network Layer 3.

Network layer protocols:

* IPv4 (there are almost no new IPv4 addresses)
* IPv6

### Connectionless

There is no responds on whether or not a packet successfully arrived (you don't know the status of the packet)

IP is media independent. It doesn't care how it's transmitted.

### IPv4 Packet

#### Characteristics

* IP address depletion (+- 4.000.000.000)
* Lack of end-to-end encryption (NAT)

#### Header

* Source IP address
* Destination IP address
* Time to Live (kill time; after this time, the packet is destroyed. Has a default of 128 hops)
* Protocol
* Version
* And more...

### IPv6

## Routing

Routers use IP addresses to communicate. It most determain whether it's talking to itself, to a device within the same network or to a device outside of my network.

#### Routing table

| IP        | Destination            |
| --------- | ---------------------- |
| 127.0.0.1 | Targets the own device |

A routing table is a table that shows the options where an router can send packets to.

A default gateway is required for remote network communication.

