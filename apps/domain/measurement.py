from dataclasses import dataclass
from datetime import datetime
from random import random
from random import seed

seed(1)


@dataclass
class Measurement:
    id: str = ""
    age: float = random()
    createdate: datetime = datetime.now()
    deleted: bool = False
    lastupdate: str = None
    uncertainty: float = random()
    updatedby: str = ""
    createdby: str = ""
