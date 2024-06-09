import app from './app'

import { PORT } from './utils/environments'

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
