# Hands-on 5

[TOC]

## IPv4

Goal: create 5 subnets consisting of 2 routers and 4 switches.

IP: `192.168.100.0`

Subnet mask: `255.255.255.0` (`11111111.11111111.11111111.00000000`)

To create a subnet and get the IP addresses of those subnets, we need to reserve a couple of bit for the network part of the subnet mask, in this case we need `3` because $2^3 - 2 = 6$, we can't use 2 becauses $2^2 - 2 = 2$ and we need 5 subnets. So we reserve the following: `11111111.11111111.11111111.000|00000`. Then we can calculate the new IP addresses:

* 192.168.100.0 (...000|00000)
* 192.168.100.32 (...001|00000)
* 192.168.100.64 (...010|00000)
* 192.168.100.96 (...011|00000)
* 192.168.100.128 (...100|00000)

| Subnet Address     | First usable host | Last usable host | Broadcast       |
| ------------------ | ----------------- | ---------------- | --------------- |
| 192.168.100.0/27   | 192.168.100.1     | 192.168.100.30   | 192.168.100.31  |
| 192.168.100.32/27  | 192.168.100.33    | 192.168.100.62   | 192.168.100.63  |
| 192.168.100.64/27  | 192.168.100.65    | 192.168.100.94   | 192.168.100.95  |
| 192.168.100.96/27  | 192.168.100.97    | 192.168.100.126  | 192.168.100.127 |
| 192.168.100.128/27 | 192.168.100.127   | 192.168.100.254  | 192.168.100.255 |

We can calculate our new subnet mask by first writing it in bits `11111111.11111111.11111111.11100000` which will be `255.255.255.224`. The `/27` behind every subnet address, shows how many bits are used by the network (count the `1s` in the new subnet mask).

## IPv6

`2001:0DB8:ACAD:00C8::`. To create a new subnet, you would increment the 4th sextet.

* `2001:0DB8:ACAD:00C8::`
* `2001:0DB8:ACAD:00C9::`
* `2001:0DB8:ACAD:00CA::`
* `2001:0DB8:ACAD:00CB::`
* `2001:0DB8:ACAD:00CC::`
* etc

Hosts also just increment. For more information about IPv6, you can check [chapter 6](./Chapter 6.html#ipv6)
