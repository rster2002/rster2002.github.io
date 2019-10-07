# Chapter 3 - Protocols and Communication

[TOC]

## Message Delivery Options

### Unicast

Using unicast, you talk to exactly one destination.

```mermaid
graph LR
	source
	switch
	dest1
	dest2
	dest3
	dest4
	
	source -->|Message| switch
	switch --- dest1
	switch --- dest2
	switch --- dest3
	switch -->|Message| dest4
```

### Multicast

Using `multicast` you talk to multiple destinations

```mermaid
graph LR
	source
	switch
	dest1
	dest2
	dest3
	dest4
	
	source -->|Message| switch
	switch --- dest1
	switch --- dest2
	switch -->|Message| dest3
	switch -->|Message| dest4
```

### Broadcast

When a `broadcast` is send, every end device on the network recieves the message.

```mermaid
graph LR
	source
	switch
	dest1
	dest2
	dest3
	dest4
	
	source -->|Message| switch
	switch -->|Message| dest1
	switch -->|Message| dest2
	switch -->|Message| dest3
	switch -->|Message| dest4
```

## Reference Models

| Layer | OSI          | TCP/IP Model   |
| ----- | ------------ | -------------- |
| 7     | Application  | Application    |
| 6     | Presentarion | Application    |
| 5     | Session      | Application    |
| 4     | Transport    | Transport      |
| 3     | Network      | Internet       |
| 2     | Data Link    | Network Access |
| 1     | Physical     | Network Access |

