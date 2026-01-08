import ReactSelect, { Props as ReactSelectProps, components, MultiValue } from 'react-select';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps extends Omit<ReactSelectProps<Option, false>, 'onChange'> {
    onChange?: (value: string) => void;
}

interface CustomMultiSelectProps extends Omit<ReactSelectProps<Option, true>, 'onChange'> {
    onChange?: (values: string[]) => void;
}

export function CustomSelect({ onChange, ...props }: CustomSelectProps) {
    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            minHeight: '40px',
            borderColor: state.isFocused ? 'hsl(221.2 83.2% 53.3%)' : 'hsl(214.3 31.8% 91.4%)',
            boxShadow: state.isFocused ? '0 0 0 1px hsl(221.2 83.2% 53.3%)' : 'none',
            '&:hover': {
                borderColor: 'hsl(221.2 83.2% 53.3%)',
            },
            backgroundColor: 'hsl(0 0% 100%)',
            borderRadius: '0.5rem',
        }),
        menu: (base: any) => ({
            ...base,
            borderRadius: '0.5rem',
            border: '1px solid hsl(214.3 31.8% 91.4%)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            zIndex: 50,
        }),
        menuList: (base: any) => ({
            ...base,
            padding: '4px',
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected
                ? 'hsl(221.2 83.2% 53.3%)'
                : state.isFocused
                  ? 'hsl(214.3 31.8% 91.4%)'
                  : 'transparent',
            color: state.isSelected ? 'hsl(0 0% 100%)' : 'hsl(222.2 84% 4.9%)',
            cursor: 'pointer',
            borderRadius: '0.375rem',
            margin: '2px 0',
            '&:hover': {
                backgroundColor: state.isSelected
                    ? 'hsl(221.2 83.2% 53.3%)'
                    : 'hsl(214.3 31.8% 91.4%)',
            },
        }),
        singleValue: (base: any) => ({
            ...base,
            color: 'hsl(222.2 84% 4.9%)',
        }),
        placeholder: (base: any) => ({
            ...base,
            color: 'hsl(215.4 16.3% 46.9%)',
        }),
        input: (base: any) => ({
            ...base,
            color: 'hsl(222.2 84% 4.9%)',
        }),
        dropdownIndicator: (base: any) => ({
            ...base,
            color: 'hsl(215.4 16.3% 46.9%)',
            '&:hover': {
                color: 'hsl(222.2 84% 4.9%)',
            },
        }),
        clearIndicator: (base: any) => ({
            ...base,
            color: 'hsl(215.4 16.3% 46.9%)',
            '&:hover': {
                color: 'hsl(222.2 84% 4.9%)',
            },
        }),
    };

    const handleChange = (option: Option | null) => {
        if (onChange && option) {
            onChange(option.value);
        }
    };

    return (
        <ReactSelect
            {...props}
            onChange={handleChange}
            styles={customStyles}
            classNamePrefix="react-select"
            placeholder="Selecione..."
            noOptionsMessage={() => 'Sem opções'}
        />
    );
}

export function CustomMultiSelect({ onChange, ...props }: CustomMultiSelectProps) {
    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            minHeight: '40px',
            borderColor: state.isFocused ? 'hsl(221.2 83.2% 53.3%)' : 'hsl(214.3 31.8% 91.4%)',
            boxShadow: state.isFocused ? '0 0 0 1px hsl(221.2 83.2% 53.3%)' : 'none',
            '&:hover': {
                borderColor: 'hsl(221.2 83.2% 53.3%)',
            },
            backgroundColor: 'hsl(0 0% 100%)',
            borderRadius: '0.5rem',
        }),
        menu: (base: any) => ({
            ...base,
            borderRadius: '0.5rem',
            border: '1px solid hsl(214.3 31.8% 91.4%)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            zIndex: 50,
        }),
        menuList: (base: any) => ({
            ...base,
            padding: '4px',
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected
                ? 'hsl(221.2 83.2% 53.3%)'
                : state.isFocused
                  ? 'hsl(214.3 31.8% 91.4%)'
                  : 'transparent',
            color: state.isSelected ? 'hsl(0 0% 100%)' : 'hsl(222.2 84% 4.9%)',
            cursor: 'pointer',
            borderRadius: '0.375rem',
            margin: '2px 0',
            '&:hover': {
                backgroundColor: state.isSelected
                    ? 'hsl(221.2 83.2% 53.3%)'
                    : 'hsl(214.3 31.8% 91.4%)',
            },
        }),
        multiValue: (base: any) => ({
            ...base,
            backgroundColor: 'hsl(160 84% 39%)',
            borderRadius: '0.375rem',
        }),
        multiValueLabel: (base: any) => ({
            ...base,
            color: 'hsl(0 0% 100%)',
        }),
        multiValueRemove: (base: any) => ({
            ...base,
            color: 'hsl(0 0% 100%)',
            '&:hover': {
                backgroundColor: 'hsl(160 84% 32%)',
                color: 'hsl(0 0% 100%)',
            },
        }),
        placeholder: (base: any) => ({
            ...base,
            color: 'hsl(215.4 16.3% 46.9%)',
        }),
        input: (base: any) => ({
            ...base,
            color: 'hsl(222.2 84% 4.9%)',
        }),
        dropdownIndicator: (base: any) => ({
            ...base,
            color: 'hsl(215.4 16.3% 46.9%)',
            '&:hover': {
                color: 'hsl(222.2 84% 4.9%)',
            },
        }),
        clearIndicator: (base: any) => ({
            ...base,
            color: 'hsl(215.4 16.3% 46.9%)',
            '&:hover': {
                color: 'hsl(222.2 84% 4.9%)',
            },
        }),
    };

    const handleChange = (options: MultiValue<Option>) => {
        if (onChange) {
            onChange(options.map(opt => opt.value));
        }
    };

    return (
        <ReactSelect
            {...props}
            isMulti
            onChange={handleChange}
            styles={customStyles}
            classNamePrefix="react-select"
            placeholder="Selecione..."
            noOptionsMessage={() => 'Sem opções'}
        />
    );
}
