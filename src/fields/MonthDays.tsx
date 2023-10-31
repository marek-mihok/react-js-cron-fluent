import useComposedClassName from '@rapid-platform/use-composed-class-name'
import React, { useMemo } from 'react'

import CustomSelect from '../components/CustomSelect'
import { UNITS } from '../constants'
import { DEFAULT_LOCALE_EN } from '../locale'
import { MonthDaysProps } from '../types'

export default function MonthDays(props: MonthDaysProps) {
  const {
    value,
    setValue,
    locale,
    className,
    weekDays,
    disabled,
    readOnly,
    leadingZero,
    period,
    mode,
  } = props
  const noWeekDays = !weekDays || weekDays.length === 0

  const internalClassName = useComposedClassName(
    function* () {
      yield 'react-js-cron-field'
      yield 'react-js-cron-month-days'

      if (className) {
        yield `${className}-field`
        yield `${className}-month-days`
      }

      if (!noWeekDays) {
        yield 'react-js-cron-month-days-placeholder'
      }
    },
    [className]
  )

  const localeJSON = JSON.stringify(locale)
  const placeholder = useMemo(() => {
    if (noWeekDays) {
      return locale.emptyMonthDays || DEFAULT_LOCALE_EN.emptyMonthDays
    }

    return locale.emptyMonthDaysShort || DEFAULT_LOCALE_EN.emptyMonthDaysShort
  }, [noWeekDays, localeJSON])

  const displayMonthDays =
    !readOnly ||
    (value && value.length > 0) ||
    ((!value || value.length === 0) && (!weekDays || weekDays.length === 0))

  return displayMonthDays ? (
    <div className={internalClassName}>
      {locale.prefixMonthDays !== '' && (
        <span>
          {locale.prefixMonthDays || DEFAULT_LOCALE_EN.prefixMonthDays}
        </span>
      )}

      <CustomSelect
        placeholder={placeholder}
        value={value}
        setValue={setValue}
        unit={UNITS[2]}
        locale={locale}
        className={className}
        disabled={disabled}
        readOnly={readOnly}
        leadingZero={leadingZero}
        period={period}
        mode={mode}
      />
    </div>
  ) : null
}
