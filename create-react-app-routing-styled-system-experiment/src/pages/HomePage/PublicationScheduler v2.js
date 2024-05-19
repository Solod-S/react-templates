import React, { useState, useEffect } from 'react'
import { DatePicker, TimePicker, Select, Button, InputNumber, Form } from 'antd'

import dayjs from 'dayjs'

const { Option } = Select

const PublicationScheduler = () => {
  const [startDate, setStartDate] = useState(dayjs())
  const [repeatInterval, setRepeatInterval] = useState('oncePerDays')
  const [repeatEndType, setRepeatEndType] = useState('never')
  const [repeatEndAttempts, setRepeatEndAttempts] = useState('1')
  const [endDate, setEndDate] = useState(dayjs(startDate).add(1, 'day'))
  const [selectedTime, setSelectedTime] = useState('10:00')

  const disabledStartDate = current => {
    return current && current < dayjs().startOf('day')
  }

  const disabledEndDate = current => {
    return current && current < startDate.add(1, 'day').startOf('day')
  }

  useEffect(() => {
    setEndDate(dayjs(startDate).add(1, 'day'))
  }, [startDate])

  const handleFormSubmit = event => {
    event.preventDefault()
    const result = {
      startDate,
      repeatInterval,
      repeatEndType,
      publicationTime: selectedTime,
    }

    switch (true) {
      case repeatInterval === 'weekly':
        result.repeatIntervalValue = startDate.format('dddd').toLowerCase()
        // ("sunday", "monday", "tuesday", "wednesday", "thursday","friday", "saturday",)
        break

      case repeatInterval === 'monthly':
        result.repeatIntervalValue = startDate.date()

        break

      default:
        result.repeatIntervalValue = null
        break
    }

    switch (true) {
      case repeatEndType === 'date':
        result.repeatEndValue = endDate
        break

      case repeatEndType === 'attempts':
        result.repeatEndValue = repeatEndAttempts
        break

      default:
        result.repeatEndValue = null
        break
    }
    console.log(`result`, result)
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <div>
        <label>Select start date:</label>
        <DatePicker
          allowClear={false}
          showTime={false}
          disabledDate={disabledStartDate}
          value={startDate}
          defaultValue={dayjs(startDate, 'YYYY-MM-DD')}
          onChange={setStartDate}
          format="YYYY-MM-DD"
        />
      </div>
      <div>
        <label>Select publication time:</label>
        <TimePicker
          allowClear={false}
          defaultValue={dayjs(selectedTime, 'HH:mm')}
          format="HH:mm"
          onChange={(value, dateString) => {
            // console.log("Time", value, dateString);
            setSelectedTime(dateString)
          }}
          minuteStep={60}
          style={{ marginBottom: '24px' }}
        />
      </div>
      <Form.Item
        name="generationIntervalType"
        label="Select repeat interval:"
        initialValue="oncePerDays"
      >
        {/* <label>Select repeat interval:</label> */}
        <Select onChange={setRepeatInterval}>
          <Option value="oncePerDays">Every day</Option>
          <Option value="weekly">Every week</Option>
          <Option value="monthly">Every month</Option>
        </Select>
      </Form.Item>
      <div>
        <label>Select end of reps:</label>
        <Select
          initialvalue="never"
          value={repeatEndType}
          onChange={setRepeatEndType}
        >
          <Option value="never">Never</Option>
          <Option value="date">After date</Option>
          <Option value="attempts">After a set count</Option>
        </Select>
        {repeatEndType === 'date' && (
          <DatePicker
            // value={dayjs(startDate).add(1, 'day')}
            value={endDate}
            onChange={setEndDate}
            disabledDate={disabledEndDate}
            format="YYYY-MM-DD"
          />
        )}
        {repeatEndType === 'attempts' && (
          <InputNumber
            value={repeatEndAttempts}
            onChange={setRepeatEndAttempts}
            min={1}
            max={999}
            initialvalue={1}
            style={{ marginLeft: '10px' }}
          />
        )}
      </div>
      <Button type="primary" htmlType="submit" onClick={handleFormSubmit}>
        Сохранить
      </Button>
    </Form>
  )
}

export default PublicationScheduler
