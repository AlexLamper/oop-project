import MouseListener from "./MouseListener";

class Wire {
    color: string;
    connected: boolean;

    constructor(color: string) {
        this.color = color;
        this.connected = false;
    }

    connect() {
        this.connected = true;
        console.log(`Wire ${this.color} connected.`);
    }

    disconnect() {
        this.connected = false;
        console.log(`Wire ${this.color} disconnected.`);
    }
}

export abstract class WifiOffScene {
    leftWires: Wire[];
    rightWires: Wire[];

    constructor() {
        this.leftWires = [];
        this.rightWires = [];
    }

    setup() {
        // Create left wires
        this.leftWires.push(new Wire("Red"));
        this.leftWires.push(new Wire("Blue"));
        this.leftWires.push(new Wire("Green"));

        // Create right wires
        this.rightWires.push(new Wire("Yellow"));
        this.rightWires.push(new Wire("Purple"));
        this.rightWires.push(new Wire("Orange"));
    }

    connectWire(wire: Wire) {
        wire.connect();
    }

    disconnectWire(wire: Wire) {
        wire.disconnect();
    }
}

