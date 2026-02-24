import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Calendar, TimeInput, Button } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import { useDateFormatter } from "@react-aria/i18n";
import CalendarIcon from "../../images/CalendarIcon";
import { today, getLocalTimeZone, Time } from "@internationalized/date";

const StartContent = ({
  Icon,
  iconClassName,
  date,
  startTime,
  endTime,
  label,
}) => {
  const formatter = useDateFormatter({ dateStyle: "short" });
  const formatTime = (time) => {
    if (!time) return "--:--";
    const hour = String(time.hour).padStart(2, "0");
    const minute = String(time.minute).padStart(2, "0");
    return `${hour}:${minute}`;
  };
  const labelContent = date
    ? `${formatter.format(date.toDate("Europe/Zagreb"))} ${formatTime(startTime)} - ${formatTime(endTime)}`
    : label;

  return (
    <div className="w-full flex items-center gap-2">
      <Icon className={`w-4 h-4 shrink-0 ${iconClassName}`} />
      <span>{labelContent}</span>
    </div>
  );
};

export function CustomDatePicker({ label, value, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const todayDate = today(getLocalTimeZone());

  const handleOnOpenChange = (open) => {
    setIsOpen(open);
  };

  React.useEffect(() => {
    if (value.date && value.startTime && value.endTime) {
      setIsOpen(false);
    }
  }, [value]);

  const isTimeInvalid =
    value.startTime &&
    value.endTime &&
    value.startTime.compare(value.endTime) >= 0;

  return (
    <div>
      <I18nProvider locale="hr-HR">
        <Popover
          classNames={{
            trigger: "w-full min-h-9",
          }}
          isOpen={isOpen}
          onOpenChange={handleOnOpenChange}
          placement="bottom"
        >
          <PopoverTrigger>
            <Button
              variant="flat"
              radius="sm"
              color={isTimeInvalid ? "danger" : "default"}
              className={isTimeInvalid ? "border-danger" : ""}
              startContent={
                <StartContent
                  Icon={CalendarIcon}
                  iconClassName={
                    isTimeInvalid ? "text-danger" : "text-zinc-700"
                  }
                  label={label}
                  date={value.date}
                  startTime={value.startTime}
                  endTime={value.endTime}
                />
              }
            ></Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              classNames={{
                gridBody: "cursor-pointer",
              }}
              value={value.date}
              onChange={(e) => onChange({ ...value, date: e })}
              minValue={todayDate}
              maxValue={todayDate}
            />
            <div className="w-full flex items-center">
              <TimeInput
                hourCycle={24}
                granularity="minute"
                label="Početak"
                size="sm"
                radius="sm"
                minValue={new Time(0, 0)}
                maxValue={value.endTime}
                value={value.startTime}
                onChange={(e) =>
                  onChange({
                    ...value,
                    startTime: e,
                  })
                }
                isInvalid={isTimeInvalid}
              />
              <TimeInput
                hourCycle={24}
                granularity="minute"
                label="Kraj"
                size="sm"
                radius="sm"
                maxValue={new Time(23, 59)}
                minValue={value.startTime}
                value={value.endTime}
                onChange={(e) => onChange({ ...value, endTime: e })}
                isInvalid={isTimeInvalid}
              />
            </div>
          </PopoverContent>
        </Popover>
        {isTimeInvalid && (
          <p className="text-danger text-sm">Kraj mora biti nakon početka.</p>
        )}
      </I18nProvider>
    </div>
  );
}
