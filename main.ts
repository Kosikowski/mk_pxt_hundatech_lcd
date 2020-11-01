/**
 * Created by Mateusz Kosikowski, Ph.D.
 */

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
    //% SLCDColour.min=0 SLCDColour.max=65535
    export function ClearScreen(SLCDColour: number): void {
        serial.writeString("cls " + SLCDColour.toString() + "\r\n");
    }

    /**
     * Sets back light level (0-100)
     */
    //% block="Set back light level %Lev"
    //% Level.min=0 Level.max=100
    export function LCD_SetBL(Level: number): void {
        serial.writeString("sebl " + Level.toString() + "\r\n");
    }


    /**
     * Darws a rectangle
     */
    //% blockId=mkSerialLCDDrawRectangle
    //% block="Draw rectangle at X %Xr Y %Yr Width %Wr Height %Hr Colour %Colour"
    //% Xr.min=1 Xr.max=220 Yr.min=1 Yr.max=176    
    //% Wr.min=1 Wr.max=220 Hr.min=1 Hr.max=176
    //% Colour.min=0 Colour.max=65535 inlineInputMode=inline
    export function DrawRectangle(Xr: number, Yr: number, Wr: number, Hr: number, Colour: number): void {
        serial.writeString("rect " + Xr.toString() + "," + Yr.toString() + "," + Wr.toString() + "," + Hr.toString() + "," + Colour.toString() + "\r\n");
    }

    //% blockId=mkSerialLCDDrawRectangleFill
    //% block="Draw rectangle fill at X %Xr Y %Yr Width %Wr Height %Hr Colour %Colour"
    //% Xr.min=1 Xr.max=220 Yr.min=1 Yr.max=176    
    //% Wr.min=1 Wr.max=220 Hr.min=1 Hr.max=176
    //% Colour.min=0 Colour.max=65535 inlineInputMode=inline
    export function DrawRectangleFill(Xr: number, Yr: number, Wr: number, Hr: number, Colour: number): void {
        serial.writeString("rect " + Xr.toString() + "," + Yr.toString() + "," + Wr.toString() + "," + Hr.toString() + "," + Colour.toString() + "\r\n");
    }

    //% block="Draw Point at X %X Y %Y Colour %Colour"
    //% X.min=1 X.max=220 Y.min=1 Y.max=176
    //% Colour.min=0 Colour.max=65535 inlineInputMode=inline
    export function DrawPoint(X: number, Y: number, Colour: number): void {
        DrawRectangleFill(X, Y, 1, 1, Colour)
    }

    
    
}