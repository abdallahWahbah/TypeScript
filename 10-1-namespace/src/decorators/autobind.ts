namespace App
{
    export const AutoBind = (target: any, methodName: string, descriptor: any) =>
    {
        const originalMethod = descriptor.value;
        const adjustedDescriptor: any = {
            configurable: true,
            get()
            {
                return originalMethod.bind(this);
            }
        }
        return adjustedDescriptor;
    }
}