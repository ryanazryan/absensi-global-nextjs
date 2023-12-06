const Input = ({ disabled = false, className, onChange, ...props }) => (
  <input
      disabled={disabled}
      className={`bg-input text-sm mb-2 peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear ${className}`}
      onChange={onChange}  // Pastikan onChange ditambahkan di sini
      {...props}
      style={{ outline: 'none' }}
  />
)

export default Input
