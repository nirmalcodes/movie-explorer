const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <>
      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-1 px-4 py-10 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p>&copy; {year} Movie Explorer. All rights reserved.</p>
          <p>
            Made with <span aria-hidden="true">&#10084;&#65039;</span>
            <span className="sr-only">love</span> by{" "}
            <a
              href="https://srnfernando.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Nirmal Fernando
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}
export default Footer
