namespace App
{
    // Drag & Drop Interfaces
    export interface Draggable // maybe a peoject item
    {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }
    export interface DragTarget // maybe a peoject list container
    {
        dragOverHandler(event: DragEvent): void;
        dropHandler(event: DragEvent): void; // when you finish the drag
        dragLeaveHandler(event: DragEvent): void; // if we canceled the drag and when you leave the drag element
    }
}