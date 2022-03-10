export interface WidgetMeta {
    pos: {
        x: number;
        y: number;
    };
    type: string;
    z: number;
}

export interface WidgetContent {
    data: any;
    params: any;
}

export interface WidgetInfo {
    id: string;
    content: WidgetContent;
    meta: WidgetMeta;
}

export interface WidgetFormProps {
    addWidget: Function;
}

export interface WidgetProps extends WidgetInfo {
    useClassName: Function;
    useStyle: Function;
}