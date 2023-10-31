import { ComboBox, IComboBox, IComboBoxOption } from '@fluentui/react'
import useComposedClassName from '@rapid-platform/use-composed-class-name'
import React, { useCallback } from 'react'

import { DEFAULT_LOCALE_EN } from '../locale'
import { PeriodProps, PeriodType } from '../types'

export default function Period(props: PeriodProps) {
  const {
    value,
    setValue,
    locale,
    className,
    disabled,
    readOnly,
    shortcuts,
    allowedPeriods,
    allowClear,
  } = props
  const options: IComboBoxOption[] = []

  if (allowedPeriods.includes('year')) {
    options.push({
      key: 'year',
      text: locale.yearOption || DEFAULT_LOCALE_EN.yearOption,
    })
  }

  if (allowedPeriods.includes('month')) {
    options.push({
      key: 'month',
      text: locale.monthOption || DEFAULT_LOCALE_EN.monthOption,
    })
  }

  if (allowedPeriods.includes('week')) {
    options.push({
      key: 'week',
      text: locale.weekOption || DEFAULT_LOCALE_EN.weekOption,
    })
  }

  if (allowedPeriods.includes('day')) {
    options.push({
      key: 'day',
      text: locale.dayOption || DEFAULT_LOCALE_EN.dayOption,
    })
  }

  if (allowedPeriods.includes('hour')) {
    options.push({
      key: 'hour',
      text: locale.hourOption || DEFAULT_LOCALE_EN.hourOption,
    })
  }

  if (allowedPeriods.includes('minute')) {
    options.push({
      key: 'minute',
      text: locale.minuteOption || DEFAULT_LOCALE_EN.minuteOption,
    })
  }

  if (
    allowedPeriods.includes('reboot') &&
    shortcuts &&
    (shortcuts === true || shortcuts.includes('@reboot'))
  ) {
    options.push({
      key: 'reboot',
      text: locale.rebootOption || DEFAULT_LOCALE_EN.rebootOption,
    })
  }

  const handleChange = useCallback(
    (
      event: React.FormEvent<IComboBox>,
      option?: IComboBoxOption | undefined
    ) => {
      if (!readOnly && option?.key) {
        setValue(option.key as PeriodType)
      }
    },
    [setValue, readOnly]
  )

  const internalClassName = useComposedClassName(
    function* () {
      yield 'react-js-cron-field'
      yield 'react-js-cron-period'

      if (className) {
        yield `${className}-field`
        yield `${className}-period`
      }
    },
    [className]
  )

  return (
    <div className={internalClassName}>
      {locale.prefixPeriod !== '' && (
        <span>{locale.prefixPeriod || DEFAULT_LOCALE_EN.prefixPeriod}</span>
      )}

      <ComboBox
        key={JSON.stringify(locale)}
        options={options}
        selectedKey={value}
        disabled={disabled}
        data-testid='select-period'
        onChange={handleChange}
      />
    </div>
  )
}
