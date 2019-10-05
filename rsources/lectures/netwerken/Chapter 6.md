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

An example IPv6 can be `2001:0DB8:ACAD:00C8:0000:0000:0000:0000/64`. One section of an IPv6 address is called an `hextet`.

Every hextet, you can remove the `0s` before an actual value, so `0DB8` becomes `DB8` and `00C8` becomes `C8`. If there is no value, in the case of `0000`, it just becomes "". So `2001:0DB8:ACAD:00C8:0000:0000` becomes `2001:DB8:ACAD:C8::` we don't use `::::`, when there are only `0s` left from left to right, you can rewrite it to `::`. More information about representing addresses can be found on [wikipedia](https://en.wikipedia.org/wiki/IPv6#Address_representation).

The first 3 hextets is used for ISP. The 4th is used for subnetting. So the first 4 hextets are used for networking. The last 2 are used for hosts.

| 2001 | DB8  | ACAD | C8     | 0    | 0    |
| ---- | ---- | ---- | ------ | ---- | ---- |
| IPS  | IPS  | IPS  | Subnet | Host | Host |

## Routing

Routers use IP addresses to communicate. It most determain whether it's talking to itself, to a device within the same network or to a device outside of my network.

#### Routing table

| IP        | Destination            |
| --------- | ---------------------- |
| 127.0.0.1 | Targets the own device |

A routing table is a table that shows the options where an router can send packets to.

A default gateway is required for remote network communication.

