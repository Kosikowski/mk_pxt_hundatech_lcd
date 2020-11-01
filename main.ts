declare const enum SLCDColour {
    //% block="White"
    White = 65535,
    //% block="Black"
    Black = 0,
    //% block="Blue"
    Blue = 31,
    //% block="Red"
    Red = 63488,
    //% block="Magenta"
    Magenta = 63519,
    //% block="Green"
    Green = 2016,
    //% block="Cyan"
    Cyan = 32767,
    //% block="Yellow"
    Yellow = 65504,
    //% block="Brown"
    Brown = 48192,
    //% block="Grey"
    Grey = 33840 // 50 shades
}

namespace mkSerialLCD {

    /**
     * Initalize the LCD
     */
    //% blockId=mkSerialLCDinitializeLCD
    //% block="Init LCD"
    export function initSLCD(): void {
        serial.redirect(SerialPin.P1, SerialPin.P2, 57600)
        serial.setRxBufferSize(128)
        serial.setTxBufferSize(128)
        ClearScreen(0)
        ClearScreen(0)
    }
    
    /**
     * Converts the color name to a number
     */
    //% blockId=mkSerialLCDCLcdColour
    //% block="%c"
    export function LcdColour(c: SLCDColour): number {
        return c;
    }

    /**
     * Clear the LCD
     */
    //% blockId=mkSerialLCDClearScreen
    //% block="Clear Lcd Screen:|Color %Color"
    //% Color.min=0 Color.max=65535
    export function ClearScreen(SLCDColour: number): void {
        serial.writeString("cls " + SLCDColour.toString() + "\r\n");
    }

    // Xend2.min=1 Xend2.max=160 Yend2.min=1 Yend2.max=128
    // Color.min=0 Color.max=65535 inlineInputMode=inline
    // block="Draw Rectangle|Xstart %Xstart2|Ystart %Ystart2|Width %Xend2|Height %Yend2|Color %Color"
    // Xstart2.min=1 Xstart2.max=160 Ystart2.min=1 Ystart2.max=128 
    
    /**
     * Darws a rectangle
     */
    //% blockId=mkSerialLCDDrawRectangle
    //% block="Draw rectangle at X &Xr Y &Yr Width &Wr Height &Hr Colour &Colour"
    export function DrawRectangle(Xr: number, Yr: number, Wr: number, Hr: number, Colour: number): void {
        serial.writeString("rect " + Xr.toString() + "," + Yr.toString() + "," + Wr.toString() + "," + Hr.toString() + "," + Colour.toString() + "\r\n");
    }
}