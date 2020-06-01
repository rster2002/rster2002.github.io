# RIPv2

[toc]

## RIP Config

```cisco
R1>en
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#ip route 0.0.0.0 0.0.0.0 S0/0/1
%Default route without gateway, if not a point-to-point interface, may impact performance
R1(config)#router rip
R1(config-router)#version 2
R1(config-router)#no auto-summery
R1(config-router)#network 192.168.1.0
R1(config-router)#network 192.168.2.0
R1(config-router)#passive-interface G0/0
R1(config-router)#default-information originate
```

Als er een netwerk is dat wordt probeert te berijken buiten het netwerk, wordt via `S0/0/1` gestuurd. 

* `passive-interface G0/0`: `G0/0` is de interface die niet is verbonden met een andere router.
* `default-information originate`: Andere netwerken kunnen nu ook via de default route praten.

### Check routing table

```cisco
R1>en
R1#show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is 0.0.0.0 to network 0.0.0.0

     192.168.1.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.1.0/24 is directly connected, GigabitEthernet0/0
L       192.168.1.1/32 is directly connected, GigabitEthernet0/0
     192.168.2.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.2.0/24 is directly connected, Serial0/0/0
L       192.168.2.1/32 is directly connected, Serial0/0/0
     209.165.200.0/24 is variably subnetted, 2 subnets, 2 masks
C       209.165.200.224/30 is directly connected, Serial0/0/1
L       209.165.200.225/32 is directly connected, Serial0/0/1
S*   0.0.0.0/0 is directly connected, Serial0/0/1
R1#
```

