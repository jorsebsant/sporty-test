interface Props {
  sports: string[]
  value: string
  onChange: (value: string) => void
}

export default function SportFilter({ sports, value, onChange }: Props) {
  return (
    <div className="w-full sm:w-56">
      <label htmlFor="sport-filter" className="sr-only">
        Filter by sport
      </label>
      <select
        id="sport-filter"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-8 pl-3 text-sm text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
      >
        <option value="">All sports</option>
        {sports.map(sport => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>
    </div>
  )
}
