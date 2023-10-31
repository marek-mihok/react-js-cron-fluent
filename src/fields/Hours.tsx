import useComposedClassName from '@rapid-platform/use-composed-class-name'

import CustomSelect from '../components/CustomSelect'
import { UNITS } from '../constants'
import { DEFAULT_LOCALE_EN } from '../locale'
import { HoursProps } from '../types'
import React from 'react'

export default function Hours(props: HoursProps) {
  const {
    value,
    setValue,
    locale,
    className,
    disabled,
    readOnly,
    leadingZero,
    clockFormat,
    period,
    mode,
  } = props

  const internalClassName = useComposedClassName(
    function* () {
      yield 'react-js-cron-field'
      yield 'react-js-cron-hours'

      if (className) {
        yield `${className}-field`
        yield `${className}-hours`
      }
    },
    [className]
  )

  return (
    <div className={internalClassName}>
      {locale.prefixHours !== '' && (
        <span>{locale.prefixHours || DEFAULT_LOCALE_EN.prefixHours}</span>
      )}

      <CustomSelect
        placeholder={locale.emptyHours || DEFAULT_LOCALE_EN.emptyHours}
        value={value}
        unit={UNITS[1]}
        setValue={setValue}
        locale={locale}
        className={className}
        disabled={disabled}
        readOnly={readOnly}
        leadingZero={leadingZero}
        clockFormat={clockFormat}
        period={period}
        mode={mode}
      />
    </div>
  )
}
