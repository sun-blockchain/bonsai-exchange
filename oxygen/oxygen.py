from iconservice import *

TAG = 'Oxygen'


# An interface of ICON Token Standard, IRC-2
class TokenStandard:
    @abstractmethod
    def name(self) -> str:
        pass

    @abstractmethod
    def symbol(self) -> str:
        pass

    @abstractmethod
    def decimals(self) -> int:
        pass

    @abstractmethod
    def totalSupply(self) -> int:
        pass

    @abstractmethod
    def balanceOf(self, _owner: Address) -> int:
        pass

    @abstractmethod
    def transfer(self, _to: Address, _value: int, _data: bytes = None):
        pass


# An interface of tokenFallback.
# Receiving SCORE that has implemented this interface can handle
# the receiving or further routine.
class TokenFallbackInterface(InterfaceScore):
    @interface
    def tokenFallback(self, _from: Address, _value: int, _data: bytes):
        pass


class Oxygen(IconScoreBase, TokenStandard):

    _NAME = 'token_name'
    _SYMBOL = 'token_symbol'
    _DECIMALS = 'decimals'
    _TOTAL_SUPPLY = 'total_supply'
    _BALANCES = 'balances'
    _LAST_TIME_RECEIVE = 'last_time_receive'
    _OXYGEN_RECEIVE_ONE_TIME = 'oxygen_receive_one_time'
    _SCOPE_TIME_RECEIVE_OXYGEN = 'scope_time_receive_oxygen'
    _AIR_DROPPED = 'air_dropped'

    @eventlog(indexed=3)
    def Transfer(self, _from: Address, _to: Address, _value: int, _data: bytes):
        pass

    def __init__(self, db: IconScoreDatabase) -> None:
        super().__init__(db)
        self._name = VarDB(self._NAME, db, value_type=str)
        self._symbol = VarDB(self._SYMBOL, db, value_type=str)
        self._decimals = VarDB(self._DECIMALS, db, value_type=int)
        self._total_supply = VarDB(self._TOTAL_SUPPLY, db, value_type=int)
        self._balances = DictDB(self._BALANCES, db, value_type=int)
        self._last_time_receive = DictDB(self._LAST_TIME_RECEIVE, db, value_type=int)
        self._oxygen_receive_one_time = VarDB(self._OXYGEN_RECEIVE_ONE_TIME, db, value_type=int)
        self._scope_time_receive_oxygen = VarDB(self._SCOPE_TIME_RECEIVE_OXYGEN, db, value_type=int)
        self._air_dropped = DictDB(self._AIR_DROPPED , db, value_type=bool)

    def on_install(self, _name: str, _symbol: str, _decimals: int, _initialSupply: int, _oxygen_receive_one_time: int, _scope_time_receive_oxygen: int) -> None:
        super().on_install()

        if _initialSupply < 0:
            revert("Initial supply cannot be less than zero")

        if _decimals < 0:
            revert("Decimals cannot be less than zero")
        if _decimals > 21:
            revert("Decimals cannot be more than 21")
        
        if _oxygen_receive_one_time < 0:
            revert("Oxygen receive one time cannot be less than zero")
        
        if _scope_time_receive_oxygen < 0:
            revert("Time receive cannot be less than zero")

        total_supply = _initialSupply * 10 ** _decimals
        Logger.debug(f'on_install: total_supply={total_supply}', TAG)

        self._name.set(_name)
        self._symbol.set(_symbol)
        self._decimals.set(_decimals)
        self._total_supply.set(total_supply)
        self._balances[self.msg.sender] = total_supply
        self._oxygen_receive_one_time.set(_oxygen_receive_one_time)
        self._scope_time_receive_oxygen.set(_scope_time_receive_oxygen)

    def on_update(self) -> None:
        super().on_update()

    @external(readonly=True)
    def name(self) -> str:
        return self._name.get()

    @external(readonly=True)
    def symbol(self) -> str:
        return self._symbol.get()

    @external(readonly=True)
    def decimals(self) -> int:
        return self._decimals.get()

    @external(readonly=True)
    def totalSupply(self) -> int:
        return self._total_supply.get()

    @external(readonly=True)
    def balanceOf(self, _owner: Address) -> int:
        return self._balances[_owner]
    
    @external(readonly=True)
    def getLastTimeReceive(self) -> int:
        return self._last_time_receive[self.msg.sender]
    
    @external(readonly=True)
    def getNow(self) -> int:
        return self.now()
    
    @external(readonly=True)
    def getScopeTime(self) -> int:
        return self._scope_time_receive_oxygen.get()
    
    @external(readonly=True)
    def getOxygenReceive(self) -> int:
        return self._oxygen_receive_one_time.get()
    
    @external(readonly=True)
    def getAirDrop(self) -> bool:
        return self._air_dropped[self.msg.sender]
    
    @external
    def airDrop(self) -> None:
        if self._balances[self.msg.sender] == 0 and not self._air_dropped[self.msg.sender]:
            self._transfer(self.owner, self.msg.sender, 30, None)
            self._air_dropped[self.msg.sender] = True

    @external
    def receiveOxygen(self) -> None:
        lastTimeReceive = self._last_time_receive[self.msg.sender]
        scopeTime = self._scope_time_receive_oxygen.get()
        oxygenReceive = self._oxygen_receive_one_time.get()

        if lastTimeReceive == 0:
            self._last_time_receive[self.msg.sender] = self.now()
            return
        
        if self.now() - lastTimeReceive < scopeTime:
            revert('Not Enough Time')
        
        currentTime = self.now()
        timesReceive = (currentTime - lastTimeReceive) / scopeTime
        timesReceive = int(timesReceive)
        totalReceive = timesReceive * oxygenReceive

        self._transfer(self.owner, self.msg.sender, totalReceive, None)
        self._last_time_receive[self.msg.sender] += scopeTime
    
    @external
    def transfer(self, _to: Address, _value: int, _data: bytes = None):
        if _data is None:
            _data = b'None'
        self._transfer(self.msg.sender, _to, _value, _data)

    def _transfer(self, _from: Address, _to: Address, _value: int, _data: bytes):

        # Checks the sending value and balance.
        if _value < 0:
            revert("Transferring value cannot be less than zero")
        if self._balances[_from] < _value:
            revert("Out of balance")

        self._balances[_from] = self._balances[_from] - _value
        self._balances[_to] = self._balances[_to] + _value

        if _to.is_contract:
            # If the recipient is SCORE,
            #   then calls `tokenFallback` to hand over control.
            recipient_score = self.create_interface_score(_to, TokenFallbackInterface)
            recipient_score.tokenFallback(_from, _value, _data)

        # Emits an event log `Transfer`
        self.Transfer(_from, _to, _value, _data)
        Logger.debug(f'Transfer({_from}, {_to}, {_value}, {_data})', TAG)
