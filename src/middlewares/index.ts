import { verifyNotExistFollower } from './follower/verifyNotExistFollower.middleware'
import { verifyNotExistLoan } from './loan/verifyNotExistLoan.middleware'
import { verifyExistLoan } from './loan/verifyExistLoan.middleware'
import { verifyIsBlockedLoan } from './loan/verifyIsBlockedLoan.middleware'
import { verifyIsFollower } from './follower/verifyIsFollower.middleware'
import { verifyNotExistBook } from './book/verifyNotExistBook.middleware'
import { verifyExistBook } from './book/verifyExistBook.middleware'
import { validateToken } from './auth/validateToken.middleware'
import { validateBody } from './validate-body/validateBody.middleware'
import { verifyUserExists } from './user/verifyUserExists.middleware'
import { verifyIsStaff } from './admin/verifyIsStaff.middleware'
import { verifyOwnerOrStaff } from './admin/verifyOwnerOrStaff.middleware'

export {
  validateToken,
  validateBody,
  verifyUserExists,
  verifyIsStaff,
  verifyExistBook,
  verifyNotExistBook,
  verifyIsFollower,
  verifyOwnerOrStaff,
  verifyIsBlockedLoan,
  verifyExistLoan,
  verifyNotExistLoan,
  verifyNotExistFollower,
}
