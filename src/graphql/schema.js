// DO NOT EDIT THIS FILE
//
// it is generated by command
//
//     npm run generate:src/graphql/schema.js
//
module.exports = {
  graphqlCcxtSchemaSource: `
# graphql-ccxt

# Enumerations
#######################################################################

enum OrderType {
  LIMIT
  MARKET
}

enum OrderSide {
  BUY
  SELL
}

enum OrderStatus {
  CANCELED
  CLOSED
  EXPIRED
  OPEN
}

# Input types
#######################################################################

input ClientKeyInput {
  exchange: String!
  label: String
}

input MarketsFilterInput {
  active: Boolean
  base: String
  quote: String
}

input OrdersFilterInput {
  symbol: String
  daysAgo: Int
  limit: Int
}

input OrderInput {
  symbol: String!
  type: OrderType!
  side: OrderSide!
  amount: Float!
  price: Float
}

# Input types for multiple exchanges
#######################################################################

input OrderMultiInput {
  client: ClientKeyInput!
  order: OrderInput!
}

input OrdersMultiInput {
  client: ClientKeyInput!
  filter: OrdersFilterInput!
}

input MarketsMultiInput {
  client: ClientKeyInput!
  filter: MarketsFilterInput
}

input TickerMultiInput {
  client: ClientKeyInput!
  symbol: String!
}

input TickersMultiInput {
  client: ClientKeyInput!
  symbols: [String!]
}

# Type definitions
#######################################################################

type Amount {
  currency: String!
  value: Float!
}

type Balance {
  free: [Amount]
  total: [Amount]
  used: [Amount]
}

type Client {
  """
  A client is identified at first by the exchange id, e.g. "binance".
  """
  exchange: String!
  """
  A label is optionally used to distinguish two clients on the same exchange.
  """
  label: String

  # Public API
  #####################################################################

  markets(filter: MarketsFilterInput): [Market]
  ticker(symbol: String!): Ticker
  tickers(symbols: [String]): [Ticker]

  # Private API
  #####################################################################

  balance(currencies: [String]): Balance
  closedOrders(filter: OrdersFilterInput!): [Order]
  openOrders(filter: OrdersFilterInput!): [Order]
}

type ClientKey {
  exchange: String!
  label: String
}

type NumericInterval {
  min: Float
  max: Float
}

type Order {
  # Params of "createOrder" method.

  """
  Currency pair symbol, e.g. BTC/ETH.
  """
  symbol: String
  """
  Can be MARKET, LIMIT.
  """
  type: OrderType
  """
  Can be BUY, SELL.
  """
  side: OrderSide
  """
  ordered amount of base currency
  """
  amount: Float
  """
  float price in quote currency (may be empty for market orders)
  """
  price: Float

  # Data from exchange, once order is created.

  """
  'filled' * 'price' (filling price used where available)
  """
  cost: Float
  """
  ISO8601 datetime of 'timestamp' with milliseconds
  """
  datetime: String
  """
  Filled amount of base currency.
  """
  filled: Float
  """
  Unix timestamp of the most recent trade on this order.
  """
  lastTradeTimestamp: Int
  """
  remaining amount to fill
  """
  remaining: Float
  """
  Can be OPEN, CLOSED, CANCELED, EXPIRED.
  """
  status: OrderStatus
  """
  Order placing/opening Unix timestamp in milliseconds.
  """
  timestamp: Int
}

type Market {
  symbol: String!
  base: String!
  quote: String!
  active: Boolean
  limits: MarketLimits
  precision: MarketPrecision
}

type MarketLimits {
  amount: NumericInterval
  price: NumericInterval
  cost: NumericInterval
  market: NumericInterval
}

type MarketPrecision {
  base: Int
  quote: Int
  amount: Int
  price: Int
}

type Ticker {
  symbol: String!
  last: Float
}

# Type definitions for multiple exchanges
#######################################################################

type MarketMulti {
  client: ClientKey!
  market: Market
}

type OrderMulti {
  client: ClientKey!
  order: Order
}

type TickerMulti {
  client: ClientKey!
  ticker: Ticker
}

type TickersMulti {
  client: ClientKey!
  tickers: [Ticker]
}

# Special types: Query and Mutation
#######################################################################

type Query {
  client(exchange: String!, label: String): Client
  clients: [Client]!

  # Public API
  #####################################################################

  marketsMulti(list: [MarketsMultiInput]): [MarketMulti]
  tickerMulti(list: [TickerMultiInput]): [TickerMulti]
  tickersMulti(list: [TickersMultiInput]): [TickersMulti]

  # Private API
  #####################################################################

  closedOrdersMulti(list: [OrdersMultiInput]): [OrderMulti]
  openOrdersMulti(list: [OrdersMultiInput]): [OrderMulti]
}

type Mutation {
  # All mutations are private API
  createOrder(client: ClientKeyInput!, order: OrderInput!): Order
  createOrderMulti(list: [OrderMultiInput]): [OrderMulti]
}
`
}
