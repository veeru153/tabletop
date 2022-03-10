import cuid from "cuid";
import { useSetRecoilState } from "recoil";
import { widgetSelector } from "../atoms/widgets";

const withFormUtils = (WidgetForm) => {
    return () => {
        const id = cuid();
        const setWidget = useSetRecoilState(widgetSelector(id));
    
        const addWidget = (type: string, params: object) => {
            const template = {
                id: id,
                meta: {
                    pos: { x: 10, y: 10 },
                    type: type,
                    z: 10,
                },
                content: {
                    params: params,
                    data: {}
                }
            }
    
            setWidget(template);
        }
    
        return <WidgetForm addWidget={addWidget} />
    }

}

export default withFormUtils;