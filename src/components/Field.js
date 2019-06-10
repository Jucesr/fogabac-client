import { BasicText, asField } from 'informed';
import es from 'date-fns/locale/es';
import React from 'react'

//  Third party components
import DatePicker from 'react-datepicker';
import Cleave from 'cleave.js/react';

const Field = asField(({ fieldState, label, kind = "text", ...props }) => {

  return (
    <div className="Form_field">
      <label>{label}</label>
      {
        kind === "text" && (
          <React.Fragment>
            <BasicText
              fieldState={fieldState}
              {...props}
              style={fieldState.error ? { border: 'solid 1px red' } : null}
            />
            {fieldState.error && fieldState.touched ? (
              <small style={{ color: 'red' }}>{fieldState.error}</small>
            ) : null}
          </React.Fragment>
        )
      }

      {
        kind === "select" && (
          <React.Fragment>
            <select
              ref={props.forwardedRef}
              value={props.value ? props.value : (!fieldState.value && fieldState.value !== 0 ? '' : fieldState.value)}
              onChange={e => {
                props.fieldApi.setValue(e.target.value);
                if (props.onChange) {
                  props.onChange(e);
                }
              }}
            >
              <option value="" disabled>
                Selecciona una opción...
              </option>
              {props.options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
            </select>
          </React.Fragment>
        )
      }

      {
        kind === "datepicker" && (
          <React.Fragment>

            <DatePicker
              showYearDropdown
              customInput={<input />}
              selected={fieldState.value}
              onChange={date => props.fieldApi.setValue(date)}
              locale={es}
              placeholderText="Selecciona una fecha"
              dateFormat="d MMMM, yyyy"
              isClearable={true}
            />

            {fieldState.error && fieldState.touched ? (
              <small style={{ color: 'red' }}>{fieldState.error}</small>
            ) : null}


          </React.Fragment>
        )
      }

      {
        kind === "currency" && (
          <React.Fragment>

            <Cleave
              onChange={e => props.fieldApi.setValue(e.target.rawValue)}
              options={{
                numeral: true,
                rawValueTrimPrefix: true,
                prefix: '$'
              }
              }
            />

            {fieldState.error && fieldState.touched ? (
              <small style={{ color: 'red' }}>{fieldState.error}</small>
            ) : null}
          </React.Fragment>
        )
      }

    </div>
  )
});

export default Field