import React, { useState, useEffect } from 'react'
import { DatePicker, TimePicker, Select, Button, InputNumber, Form } from 'antd'
import dayjs from 'dayjs'

const { Option } = Select

const PublicationScheduler = () => {
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [repeatInterval, setRepeatInterval] = useState('oncePerDays')
  const [repeatEndType, setRepeatEndType] = useState('never')
  const [repeatEndAttempts, setRepeatEndAttempts] = useState(1)
  const [endDate, setEndDate] = useState(
    dayjs().add(1, 'day').format('YYYY-MM-DD')
  )
  const [selectedTime, setSelectedTime] = useState('10:00')

  const disabledStartDate = current => {
    return current && current < dayjs().startOf('day')
  }

  const disabledEndDate = current => {
    return current && current < dayjs(startDate).add(1, 'day').startOf('day')
  }

  useEffect(() => {
    setEndDate(dayjs(startDate).add(1, 'day').format('YYYY-MM-DD'))
  }, [startDate])

  const handleFormSubmit = event => {
    event.preventDefault()
    const result = {
      startDate,
      repeatInterval,
      repeatEndType,
      publicationTime: selectedTime,
    }

    switch (repeatInterval) {
      case 'weekly':
        result.repeatIntervalValue = dayjs(startDate)
          .format('dddd')
          .toLowerCase()
        break

      case 'monthly':
        result.repeatIntervalValue = dayjs(startDate).date()
        break

      default:
        result.repeatIntervalValue = null
        break
    }

    switch (repeatEndType) {
      case 'date':
        result.repeatEndValue = endDate
        break

      case 'attempts':
        result.repeatEndValue = repeatEndAttempts
        break

      default:
        result.repeatEndValue = null
        break
    }
    console.log('result', result)
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <div>
        <label>Select start date:</label>
        <DatePicker
          allowClear={false}
          showTime={false}
          disabledDate={disabledStartDate}
          value={dayjs(startDate, 'YYYY-MM-DD')}
          onChange={(_, dateString) => setStartDate(dateString)}
          format="YYYY-MM-DD"
        />
      </div>
      <div>
        <label>Select publication time:</label>
        <TimePicker
          allowClear={false}
          defaultValue={dayjs(selectedTime, 'HH:mm')}
          format="HH:mm"
          onChange={(_, dateString) => setSelectedTime(dateString)}
          minuteStep={60}
          style={{ marginBottom: '24px' }}
        />
      </div>
      <Form.Item
        name="generationIntervalType"
        label="Select repeat interval:"
        initialValue="oncePerDays"
      >
        <Select onChange={setRepeatInterval}>
          <Option value="oncePerDays">Every day</Option>
          <Option value="weekly">Every week</Option>
          <Option value="monthly">Every month</Option>
        </Select>
      </Form.Item>
      <div>
        <label>Select end of reps:</label>
        <Select
          initialValue="never"
          value={repeatEndType}
          onChange={setRepeatEndType}
        >
          <Option value="never">Never</Option>
          <Option value="date">After date</Option>
          <Option value="attempts">After a set count</Option>
        </Select>
        {repeatEndType === 'date' && (
          <DatePicker
            value={dayjs(endDate, 'YYYY-MM-DD')}
            onChange={(_, dateString) => setEndDate(dateString)}
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
            style={{ marginLeft: '10px' }}
          />
        )}
      </div>
      <Button type="primary" htmlType="submit" onClick={handleFormSubmit}>
        Save
      </Button>
    </Form>
  )
}

export default PublicationScheduler
