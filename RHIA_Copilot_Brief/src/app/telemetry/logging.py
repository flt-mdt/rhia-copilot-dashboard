import logging
import sys
from pythonjsonlogger import jsonlogger


def setup_logger(name: str = "rhia") -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    log_handler = logging.StreamHandler(sys.stdout)
    formatter = jsonlogger.JsonFormatter(
        fmt="%(asctime)s %(levelname)s %(name)s %(message)s",
        rename_fields={"levelname": "level", "asctime": "timestamp"},
    )
    log_handler.setFormatter(formatter)

    logger.addHandler(log_handler)
    logger.propagate = False

    return logger


logger = setup_logger()
 
