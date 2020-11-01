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

declare const enum FontSize {
    //% block="Size16"
    Size16 = 16,
    
    //% block="Size24"
    Size24 = 24,
    
    //% block="Size32"
    Size32 = 32,

    //% block="Size64"
    Size64 = 64,
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
      * RGB to  RGB565 colurs converteer
     */
    //% blockId=mkSerialLCDClearScreenRGB565
    //% block="red %red green %green blue %blue"
    export function rgb565(red: number, green: number, blue: number): number {
        return ((red) << 11) | ((green) << 5) | (blue);
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
        serial.writeString("fill " + Xr.toString() + "," + Yr.toString() + "," + Wr.toString() + "," + Hr.toString() + "," + Colour.toString() + "\r\n");
    }

    //% blockId=mkSerialLCDDrawPoint
    //% block="Draw Point at X %X Y %Y Colour %Colour"
    //% X.min=1 X.max=220 Y.min=1 Y.max=176
    //% Colour.min=0 Colour.max=65535 inlineInputMode=inline
    export function DrawPoint(X: number, Y: number, Colour: number): void {
        DrawRectangleFill(X, Y, 1, 1, Colour)
    }

    //% blockId=mkSerialLCDDrawLine
    //% block="Draw Line from X %XL Y %YL to X %XLe Y %YLe Color %Colour"
    //% XL.min=1 XL.max=220 YL.min=1 YL.max=176    
    //% XLe.min=1 XLe.max=220 YLe.min=1 YLe.max=176
    //% Colour.min=0 Colour.max=65535 inlineInputMode=inline
    export function DrawLine(XL: number, YL: number, XLe: number, YLe: number, Colour: number): void {
        serial.writeString("line " + XL.toString() + "," + YL.toString() + "," + XLe.toString() + "," + YLe.toString() + "," + Colour.toString() + "\r\n");
    }
    
    //% blockId=mkSerialLCDDisplayTextAtPosition
    //% block="Display String at X %X Y %Y colour %Colour background Color %bColour string %ch size %size"
    //% X.min=1 X.max=220 Y.min=1 Y.max=176 inlineInputMode=inline
    //% Colour.min=0 Colour.max=65535 bColour.min=0 bColour.max=65535
    export function DisplayString(X: number, Y: number, Colour: number, bColour: number, ch: string, size: FontSize): void {
        //serial.writeString("ds16 " + x.toString() + "," + y.toString() + "," + fColor.toString() + "," + bColor.toString() + "," + ch + "\r\n");
        const s = "ds" + size.toString() + " " + X.toString() + "," + Y.toString() + "," + Colour.toString() + "," + bColour.toString() + "," 
        serial.writeString(s + ch + "\r\n");
    }


    //% block="Draw Circle center at X %X Y %Y Radius %Radius Color %Color"
    //% X.min=1 X.max=176 Y.min=1 Y.max=176
    //% Radius.min=0 Radius.max=176
    //% Colour.min=0 Colour.max=65535 inlineInputMode=inline
    export function DrawCircle(X: number, Y: number, Radius: number, Colour: number): void {
        serial.writeString("cir " + X.toString() + "," + Y.toString() + "," + Radius.toString() + "," + Colour.toString() + "\r\n");
    }

    //% block="Draw Filled Circle center at X %X Y %Y Radius %Radius Color %Color"
    //% X.min=1 X.max=176 Y.min=1 Y.max=176
    //% Radius.min=0 Radius.max=176
    //% Colour.min=0 Colour.max=65535 inlineInputMode=inline
    export function DrawFilledCircle(X: number, Y: number, Radius: number, Colour: number): void {
        serial.writeString("cirf " + X.toString() + "," + Y.toString() + "," + Radius.toString() + "," + Colour.toString() + "\r\n");
    }

    /**
     * Display BMP from file on TF card
     */
    //% block="Display BMP X %X Y %Y BMP name %name"
    //% X.min=1 X.max=220 Y.min=1 Y.max=176 
    export function DisplayBMP(X: number, Y: number, name: string): void {
        let notEmpty = name.length;
        if (notEmpty) {
            serial.writeString("pic " + X.toString() + "," + Y.toString() + "," + name + "\r\n");
        }
    }
    
}