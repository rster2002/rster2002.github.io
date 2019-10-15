# Hands-on 6

## Creating a subnet with 100 hosts

| 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 128  | 64   | 32   | 16   | 8    | 4    | 2    | 1    |

```mermaid
graph LR
	router((Router))
	switch1[S1]
	switch2[S2]
	
	switch1 ---|"F0/0"| router
	router ---|"F0/1"| switch2
```

### Config Router

We need to configure the interfaces: `F0/0` and `F0/1`.

```cisco
R1#interface F0/0
R1(interface)#ip add <subnet address> <subnet mask>
R1(interface)#no shut
R1(interface)#exit

R1#interface F0/1
R1(interface)#ip add <second subnet address> <subnet mask>
R1(interface)#no shut
R1(interface)#exit
```

```mermaid
graph LR
	r1
	r2
	s1
	s2
	s3
	s4
	
	s1 ---|"1 - G0/0 - 0"| r1
	s2 ---|"33 - G0/1 - 32"| r1
	s3 ---|"65 - G0/0 - 64"| r2
	s4 ---|"97 - G0/1 - 96"| r2
	
	r1 ---|"128 - S0/0 - 129"| r2
```

