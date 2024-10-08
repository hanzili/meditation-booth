## scan all the devices on the network
```bash
sudo nmap 192.168.100.0/24
```

## connect kasa smart plug
P-LINK_Smart Plug_A331 -> scent
TP-LINK_Smart Plug_A31F -> neurosity

join the network of the kasa smart plug
```bash
kasa --debug --host 192.168.100.1 wifi join Oniji --password onijioniji
Keytype: 3

kasa discover
```

### connect to bluetooth
linux
```bash
sudo bluetoothctl
pair XX:XX:XX:XX:XX:XX
trust XX:XX:XX:XX:XX:XX
connect XX:XX:XX:XX:XX:XX
scan off
exit

```

## connect to remote server
```bash
ssh -i /Users/apple/Desktop/SSH\ key\ 2024-09-22.key  ubuntu@151.145.39.36
```

## connect neurosity to the same network
- connect your phone to the same network
- open neurosity app and connect to the device

