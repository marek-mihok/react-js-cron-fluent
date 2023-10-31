import useComposedClassName from '@rapid-platform/use-composed-class-name'

import CustomSelect from '../components/CustomSelect'
import { UNITS } from '../constants'
import { DEFAULT_LOCALE_EN } from '../locale'
import { MonthsProps } from '../types'

export default function Months(props: MonthsProps) {
  const {
    value,
    setValue,
    locale,
    className,
    humanizeLabels,
    disabled,
    readOnly,
    period,
    mode,
  } = props
  const optionsList = locale.months || DEFAULT_LOCALE_EN.months

  const internalClassName = useComposedClassName(
    function* () {
      yield 'react-js-cron-field'
      yield 'react-js-cron-months'

      if (className) {
        yield `${className}-field`
        yield `${className}-months`
      }
    },
    [className]
  )

  return (
    <div className={internalClassName}>
      {locale.prefixMonths !== '' && (
        <span>{locale.prefixMonths || DEFAULT_LOCALE_EN.prefixMonths}</span>
      )}

      <CustomSelect
        placeholder={locale.emptyMonths || DEFAULT_LOCALE_EN.emptyMonths}
        optionsList={optionsList}
        grid={false}
        value={value}
        unit={{
          ...UNITS[3],
          alt: locale.altMonths || DEFAULT_LOCALE_EN.altMonths,
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
  )
}
