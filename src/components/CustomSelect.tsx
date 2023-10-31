import { ComboBox, IComboBox, IComboBoxOption } from '@fluentui/react'
import useComposedClassName from '@rapid-platform/use-composed-class-name'
import { useCallback, useMemo } from 'react'
import { formatValue } from '../converter'
import { CustomSelectProps } from '../types'

export default function CustomSelect(props: CustomSelectProps) {
  const {
    value,
    grid = true,
    optionsList,
    setValue,
    locale,
    className,
    humanizeLabels,
    disabled,
    readOnly,
    leadingZero,
    clockFormat,
    period,
    unit,
    mode,
    ...otherProps
  } = props

  const selectedKey = useMemo(() => {
    if (value && Array.isArray(value)) {
      return value.map((i) => i.toString())
    }

    return []
  }, [value])

  const options = useMemo(
    () => {
      if (optionsList) {
        return optionsList.map((option, index) => {
          const number = unit.min === 0 ? index : index + 1

          return {
            key: number.toString(),
            text: option,
          }
        })
      }

      return [...Array(unit.total)].map((e, index) => {
        const number = unit.min === 0 ? index : index + 1

        return {
          key: number.toString(),
          text: formatValue(
            number,
            unit,
            humanizeLabels,
            leadingZero,
            clockFormat
          ),
        }
      })
    },
    [optionsList, leadingZero, humanizeLabels, clockFormat]
  )

  const onChange = useCallback(
    (
      event: React.FormEvent<IComboBox>,
      option?: IComboBoxOption | undefined
    ) => {
      if (!option) {
        return
      }

      const selected = option.selected

      setValue(
        selected
          ? [...(value ?? []), option.key as number]
          : (value ?? [])?.filter((i) => i !== +option.key && i !== option.key)
      )
    },
    [value]
  )

  const popupClassName = useComposedClassName(
    function* () {
      yield 'react-js-cron-select-dropdown'
      yield `react-js-cron-select-dropdown-${unit.type}`
      yield 'react-js-cron-custom-select-dropdown'
      yield `react-js-cron-custom-select-dropdown-${unit.type}`

      if (unit.type === 'minutes' && period !== 'hour' && period !== 'day') {
        yield 'react-js-cron-custom-select-dropdown-minutes-large'
      }

      if (unit.type === 'minutes' && (period === 'day' || period === 'hour')) {
        yield 'react-js-cron-custom-select-dropdown-minutes-medium'
      }

      if (unit.type === 'hours' && clockFormat === '12-hour-clock') {
        yield 'react-js-cron-custom-select-dropdown-hours-twelve-hour-clock'
      }

      if (grid) {
        yield 'react-js-cron-custom-select-dropdown-grid'
      }

      if (className) {
        yield `${className}-select-dropdown`
        yield `${className}-select-dropdown-${unit.type}`
      }

      if (typeof otherProps.calloutProps?.className === 'string') {
        yield otherProps.calloutProps.className
      }
    },
    [className, otherProps.calloutProps?.className, grid, clockFormat, period]
  )

  return (
    <ComboBox
      {...otherProps}
      multiSelect={mode === 'multiple'}
      selectedKey={selectedKey}
      options={options}
      onChange={onChange}
      disabled={disabled || readOnly}
      calloutProps={{ ...props.calloutProps, className: popupClassName }}
      data-testid={`custom-select-${unit.type}`}
    />
  )
}
