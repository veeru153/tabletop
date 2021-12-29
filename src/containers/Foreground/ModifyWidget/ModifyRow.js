import React from 'react';
import { TextInput } from '../../../common/ui';

const ModifyRow = ({ label, placeholder, value, onChange }) => (
    <div>
        <h2>{label}</h2>
        <TextInput
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
)

export default ModifyRow;