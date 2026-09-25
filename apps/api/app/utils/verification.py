import hashlib
import secrets


def generate_verification_code() -> str:
    return f"{secrets.randbelow(1_000_000):06d}"


def hash_verification_code(code: str) -> str:
    return hashlib.sha256(code.encode()).hexdigest()


def verify_verification_code(
    code: str,
    code_hash: str,
) -> bool:
    return hashlib.sha256(code.encode()).hexdigest() == code_hash