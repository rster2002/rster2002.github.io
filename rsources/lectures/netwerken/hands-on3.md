# Hands-on 3

[TOC]

## Difference SWITCH and ROUTER

### Switch

* Works on LAN, not WAN
* Works with `frames`
* Has a lot of ports
* Has a `MAC table`, only stores MAC addresses

### Router

* Works on both LAN and WAN
* Works with `packets`
* Layer 3 hardware
* Connects multiple networks.
* Creates the route to where to send packets to.
* Has a `routing table`, only stores IP addresses.
* Packet filtering
  * If a packet is less than `64` bytes or larger than `50000` bytes, it filters it out.

## Router

### VTY

The router's `Virtual Terminal Lines` (VTY). The VTY handels tellnet and ssh connections. You can configure the VTY by using `line vty [min] [max]`.

### Interface

An interface is an connection between devices. You need to configure these to allow devices to talk to eachother.

## Router configuration

| Command                       | Shortened command      | Requirements                            | Description                                                  |
| ----------------------------- | ---------------------- | --------------------------------------- | ------------------------------------------------------------ |
| enable                        | en                     | None (password)                         | Enters privalige mode (admin mode)                           |
| config terminal               | conf t                 | Admin                                   | Opens the application to configure the device                |
| hostname [name]               |                        | Config terminal (admin)                 | Changes the hostname of the device (the device name)         |
| no ip domain-lookup           |                        | Config terminal (admin)                 | Prevent's the router to look for a domain name (for example, `google.com` is a domain) |
| banner motd [message]         |                        | Config terminal (admin)                 | Set's the banner motd that will be displayed on startup      |
| line console 0                |                        | Config terminal (admin)                 | Opens the configuration for the console port. You can remember it by thinking of a line that you connect to that port to configure. |
| password [password]           |                        | Line (console)                          | Set's the password of the port                               |
| login                         |                        | Line (console)                          | Log's in the user                                            |
| exit                          | ex                     | Line (console), Config terminal (admin) | exits the current app                                        |
| line vty [min] [max]          |                        | Config terminal (admin)                 | Connects to the routers `virtial terminal lines` ([VTY](vyt)) and makes them configurable. |
| interface [type] [interface]  | int [type] [interface] | Config terminal (admin)                 | Opens the interface configuration app.                       |
| description [text]            |                        | Interface                               | Adds a description to the interface.                         |
| ip address [ip] [subnet mask] |                        | Interface                               | Set's the ip and subnet mask for that interface.             |
| no shutdown                   | no shut                | Interface                               | Ensures that the interface doesn't close.                    |
| enable password [password]    |                        | Config terminal (admin)                 | Set's a password to the `enable` command.                    |



### Basic configuration

We need to do some basic configuration, like changing the `hostname` and adding a `banner`. Using `no ip domain-lookup`. This prevents the router from using DNS.

```cisco
Router>en
Router#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Router(config)#hostname R1
R1(config)#no ip domain-lookup
R1(config)#banner motd "Unauthorized access is strictly prohibited"
```

### Command interface configuration

You need to configure the console interface (port) on your router so people can't just access it without a password.

```cisco
R1(config)# enable password class
R1(config)#line console 0
R1(config-line)#password cisco
R1(config-line)#login
```

### Virtual Terminal Lines configuration

Configures the tellnet (and ssh) lines and assignes a password

```cisco
R1(config)#line vty 0 4
R1(config-line)#password cisco
R1(config-line)#login
R1(config-line)#exit
```

### Configure network interfaces

To enable other devices to use this router to send packets.

```cisco
R1(config)#interface gig 0/0
R1(config-if)#description connection to S1
R1(config-if)#ip address 192.168.1.1 255.255.255.0
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up
exit
R1(config)#int gig 0/1
R1(config-if)#description connection to S2
R1(config-if)#ip address 192.168.2.1 255.255.255.0
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up
exit
```

### Save config

You need to encrypt the passwords. Then you need to save the config because the config is only saved in the RAM. To make sure your config doesn't disapear when you exit, you have to copy it to the `startup-config`.

```cisco
R1(config)#service password-encryption
R1(config)#exit
R1#copy running-config  startup-config 
Destination filename [startup-config]? 
Building configuration..
```

[vty]: #vty