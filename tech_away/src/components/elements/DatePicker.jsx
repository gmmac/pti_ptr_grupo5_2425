import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { Form } from 'react-bootstrap';
import 'primereact/resources/themes/lara-light-blue/theme.css';

const DatePicker = ({
    label,
    name,
    value,
    error,
    onChange,
    view = 'date',
    dateFormat = 'dd/mm/yy',
    placeholder = 'Selecione a data',
    appendTo = 'self',
    showIcon = true,
    disabled = false,
}) => {


    const getDateValue = (val) => {
        if (!val) return null;
        return val instanceof Date ? val : new Date(val);
    };

    const handleChange = (e) => {
        if (e.value) {
            onChange({
                target: {
                    name,
                    value: view === 'year' ? e.value.getFullYear().toString() : e.value,
                }
            });
        } else {
            onChange({
                target: {
                    name,
                    value: '',
                }
            });
        }
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Calendar
                name={name}
                value={getDateValue(value)}
                onChange={handleChange}
                view={view}
                dateFormat={dateFormat}
                showIcon={showIcon}
                appendTo={appendTo}
                placeholder={placeholder}
                className={`p-inputtext ${error ? 'p-invalid' : ''}`}
                disabled={disabled}
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    padding: '0px',
                }}
                inputStyle={{
                    borderTopLeftRadius: '50px',
                    borderBottomLeftRadius: '50px',
                    padding: '6px 12px',
                }}
                panelStyle={{
                    borderRadius: '10px',
                }}
            />
            {error && (
                <div className="invalid-feedback" style={{ display: 'block' }}>
                    {error}
                </div>
            )}

            {/* Estilo customizado para o botão do calendário */}
            <style>
                {`
                    .p-datepicker-trigger {
                        border: var(--variant-one);
                        border-top-right-radius: 50px !important;
                        border-bottom-right-radius: 50px !important;
                        padding-right: 0.3rem;
                        background-color: var(--variant-one);
                    }
                `}
            </style>
        </Form.Group>
    );
};

export default DatePicker;
