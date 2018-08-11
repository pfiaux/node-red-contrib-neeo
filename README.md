# NEEO with Node-RED

Node-RED nodes for for interacting with the NEEO Brain.

Currently WIP, more nodes/options to be implemented.

## Nodes

### Functions

* Get Active now
* (TODO) Get slider/switch/sensor

### Outputs

* Trigger recipe
* (TODO) Set slider/switch

## Settings and NEEO Brains

* (TODO) Discovered
* Manually added

## Backlog

### 0.1.0 Read/Set Values on NEEO Brain

Reading and setting most values for using the devices on the Brain.

- [x] Active now (with hardcoded stuff) node
- [x] NEEO Brain config node
- [] trigger recipe node
- [] read sensor value node
- [] set switch/slider value node
- [] trigger device macro

### 0.2.0 Push updates

Getting push updates from the NEEO Brain so polling on interval isn't needed, sensor updates come in.

- [] listen for sensor updates

### Beyond

- [] Improve nodes with status https://nodered.org/docs/creating-nodes/status
- [] Discovery and add local brains and store by hostname (dynamic ip lookup if it changes)
- [] Listen for other Brain events (recipes, commands...)