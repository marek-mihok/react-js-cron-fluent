import useComposedClassName from '@rapid-platform/use-composed-class-name'
import React, { useMemo } from 'react'
import CustomSelect from '../components/CustomSelect'
import { UNITS } from '../constants'
import { DEFAULT_LOCALE_EN } from '../locale'
import { WeekDaysProps } from '../types'

export default function WeekDays(props: WeekDaysProps) {
  const {
    value,
    setValue,
    locale,
    className,
    humanizeLabels,
    monthDays,
    disabled,
    readOnly,
    period,
    mode,
  } = props
  const optionsList = locale.weekDays || DEFAULT_LOCALE_EN.weekDays
  const noMonthDays = period === 'week' || !monthDays || monthDays.length === 0

  const internalClassName = useComposedClassName(
    function* () {
      yield 'react-js-cron-field'
      yield 'react-js-cron-week-days'

      if (className) {
        yield `${className}-field`
        yield `${className}-week-days`
      }

      if (noMonthDays) {
        yield 'react-js-cron-week-days-placeholder'
      }
    },
    [className, noMonthDays]
  )

  const localeJSON = JSON.stringify(locale)
  const placeholder = useMemo(
    () => {
      if (noMonthDays) {
        return locale.emptyWeekDays || DEFAULT_LOCALE_EN.emptyWeekDays
      }

      return locale.emptyWeekDaysShort || DEFAULT_LOCALE_EN.emptyWeekDaysShort
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [noMonthDays, localeJSON]
  )

  const displayWeekDays =
    period === 'week' ||
    !readOnly ||
    (value && value.length > 0) ||
    ((!value || value.length === 0) && (!monthDays || monthDays.length === 0))

  const monthDaysIsDisplayed =
    !readOnly ||
    (monthDays && monthDays.length > 0) ||
    ((!monthDays || monthDays.length === 0) && (!value || value.length === 0))

  return displayWeekDays ? (
    <div className={internalClassName}>
      {locale.prefixWeekDays !== '' &&
        (period === 'week' || !monthDaysIsDisplayed) && (
          <span>
            {locale.prefixWeekDays || DEFAULT_LOCALE_EN.prefixWeekDays}
          </span>
        )}

      {locale.prefixWeekDaysForMonthAndYearPeriod !== '' &&
        period !== 'week' &&
        monthDaysIsDisplayed && (
          <span>
            {locale.prefixWeekDaysForMonthAndYearPeriod ||
              DEFAULT_LOCALE_EN.prefixWeekDaysForMonthAndYearPeriod}
          </span>
        )}

      <CustomSelect
        placeholder={placeholder}
        optionsList={optionsList}
        grid={false}
        value={value}
        unit={{
          ...UNITS[4],
          alt: locale.altWeekDays || DEFAULT_LOCALE_EN.altWeekDays,
        }}
        setValue={setValue}
        locale={locale}
        className={className}
        humanizeLabels={humanizeLabels}
        disabled={disabled}
        readOnly={readOnly}
        period={period}
        mode={mode}
      />
    </div>
  ) : null
}
