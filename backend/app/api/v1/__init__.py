from fastapi import APIRouter

from .actions import router as actions_router
from .role_actions import router as role_actions_router
from .roles import router as roles_router
from .ticket_histories import router as ticket_histories_router
from .tickets import router as tickets_router
from .users import router as users_router
from .auth import router as auth_router

router = APIRouter(prefix="/api/v1")
router.include_router(auth_router)
router.include_router(users_router)
router.include_router(roles_router)
router.include_router(actions_router)
router.include_router(role_actions_router)
router.include_router(tickets_router)
router.include_router(ticket_histories_router)
