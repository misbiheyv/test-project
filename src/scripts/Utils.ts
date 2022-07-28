export default abstract class Utils {

    static getNumberFromElID(id: string) {
        const num = /\d+$/.exec(id)
        return num ? num[0] : undefined
    }

    static getChildrenElement(
        parent: Element, 
        option: ['class'|'id', string] | undefined
    ) : Element | undefined {
        if (option === undefined) return ;

        let acc = undefined;

        const inner = ( parent: Element, option: ['class'|'id', string]) : Element | undefined => {
            for (const child of parent.children) {
                const [k, v] = option
                if (!child.attributes[<any>k] || !child.attributes[<any>k].value) continue;

                if (child.attributes[<any>k].value.split(' ').includes(v)) {
                    return acc = child;
                }

                inner(child, option);
            }

        }
        
        inner(parent, option)

        return acc;
    }

}