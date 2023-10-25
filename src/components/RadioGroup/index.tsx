import { createEffect, createMemo, createUniqueId } from 'solid-js';
import { normalizeProps, useMachine } from '@zag-js/solid';
import * as radio from '@zag-js/radio-group';
import './styles.css';

interface RadioGroupProps {
    groups: { id: string, label: string }[];
    selected: string;
    select: (v: string) => void;
}

const CheckBox = ({ groups, selected, select }: RadioGroupProps) => {
    const [state, send] = useMachine(radio.machine({
        id: createUniqueId(),
        value: selected,
        onValueChange(details) {
            select(details.value);
        },
    }));

    const api = createMemo(() => radio.connect(state, send, normalizeProps));

    return (
        <div {...api().rootProps}>
            <h3 {...api().labelProps}>Tools</h3>
            {groups.map((opt) => (
                <label {...api().getItemProps({ value: opt.id })}>
                    <span {...api().getItemTextProps({ value: opt.id })}>{opt.label}</span>
                    <input {...api().getItemHiddenInputProps({ value: opt.id })} />
                    <div {...api().getItemControlProps({ value: opt.id })} />
                </label>
            ))}
        </div>
    );
};

export default CheckBox;
