import { BasicText, asField } from 'informed';
import es from 'date-fns/locale/es';
import React from 'react'

//  Third party components
import DatePicker from 'react-datepicker';
import Cleave from 'cleave.js/react';

const Field = asField(({ fieldState, label, kind = "text", ...props }) => {

  return (
    <div className="Form_field">
      <label>
        {label}
        <span>
            {fieldState.error && fieldState.touched ? (
              <small style={{ color: 'red' }}>{fieldState.error}</small>
            ) : null}
        </span>
      </label>
      {
        kind === "text" && (
          <React.Fragment>
            <BasicText
              fieldState={fieldState}
              {...props}
              style={fieldState.error ? { border: 'solid 1px red' } : null}
            />
            
          </React.Fragment>
        )
      }

      {
        kind === "select" && (
          <React.Fragment>
            <select
              style={fieldState.error ? { border: 'solid 1px red' } : null}
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
              {props.options && props.options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
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
              minDate={props.minDate}
              maxDate={props.maxDate}
            />




          </React.Fragment>
        )
      }

      {
        kind === "currency" && (
          <React.Fragment>

            <Cleave
              value={fieldState.value}
              onChange={e => props.fieldApi.setValue(e.target.rawValue)}
              options={{
                numeral: true,
                rawValueTrimPrefix: true,
                numeralDecimalScale: 4,
                prefix: '$'
              }
              }
            />


          </React.Fragment>
        )
      }

    {
        kind === "number" && (
          <React.Fragment>

            <Cleave
              value={fieldState.value}
              onChange={e => props.fieldApi.setValue(e.target.rawValue)}
              options={{
                numeral: true
              }
              }
            />


          </React.Fragment>
        )
      }

      {
        kind === "percentage" && (
          <React.Fragment>

            <Cleave
              value={fieldState.value}
              onChange={e => props.fieldApi.setValue(e.target.rawValue)}
              options={{
                numeral: true,
                rawValueTrimPrefix: true,
                numeralDecimalScale: 4,
                prefix: '%'
              }
              }
            />


          </React.Fragment>
        )
      }

      {
        kind === "file" && (
          <React.Fragment>

            <input
              // {...props}
              // fieldState={fieldState}
              value={fieldState.value ? fieldState.value.name: ''}
              onChange={event => {
                props.fieldApi.setValue({
                  ...fieldState.value,
                  name: event.target.value
                })
              }}
              className="Form_field_file"
              style={fieldState.error ? { border: 'solid 1px red' } : null}
            />

            <input type="file" onChange={event => {
              props.fieldApi.setValue({
                name: event.target.files[0].name,
                file: event.target.files[0]
              })
            }} className="inputfile" id="embedpollfileinput" />
            <label htmlFor="embedpollfileinput" className="Form_field_label ui icon button">
              <i className="ui search icon"></i>
              
            </label>


          </React.Fragment>
        )
      }

    </div>
  )
});

export default Field