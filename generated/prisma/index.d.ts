
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model Club
 * 
 */
export type Club = $Result.DefaultSelection<Prisma.$ClubPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model EventDiscussionThread
 * 
 */
export type EventDiscussionThread = $Result.DefaultSelection<Prisma.$EventDiscussionThreadPayload>
/**
 * Model EventDiscussionReply
 * 
 */
export type EventDiscussionReply = $Result.DefaultSelection<Prisma.$EventDiscussionReplyPayload>
/**
 * Model ClubMembership
 * 
 */
export type ClubMembership = $Result.DefaultSelection<Prisma.$ClubMembershipPayload>
/**
 * Model HubFollow
 * 
 */
export type HubFollow = $Result.DefaultSelection<Prisma.$HubFollowPayload>
/**
 * Model HubBlock
 * 
 */
export type HubBlock = $Result.DefaultSelection<Prisma.$HubBlockPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model RSVP
 * 
 */
export type RSVP = $Result.DefaultSelection<Prisma.$RSVPPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ORGANIZER: 'ORGANIZER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const EventStatus: {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED'
};

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus]


export const ClubRole: {
  OWNER: 'OWNER',
  EDITOR: 'EDITOR'
};

export type ClubRole = (typeof ClubRole)[keyof typeof ClubRole]


export const HubBlockType: {
  TEXT: 'TEXT',
  RESOURCE: 'RESOURCE',
  FAQ: 'FAQ'
};

export type HubBlockType = (typeof HubBlockType)[keyof typeof HubBlockType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type EventStatus = $Enums.EventStatus

export const EventStatus: typeof $Enums.EventStatus

export type ClubRole = $Enums.ClubRole

export const ClubRole: typeof $Enums.ClubRole

export type HubBlockType = $Enums.HubBlockType

export const HubBlockType: typeof $Enums.HubBlockType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Posts
 * const posts = await prisma.post.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Posts
   * const posts = await prisma.post.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.club`: Exposes CRUD operations for the **Club** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clubs
    * const clubs = await prisma.club.findMany()
    * ```
    */
  get club(): Prisma.ClubDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventDiscussionThread`: Exposes CRUD operations for the **EventDiscussionThread** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventDiscussionThreads
    * const eventDiscussionThreads = await prisma.eventDiscussionThread.findMany()
    * ```
    */
  get eventDiscussionThread(): Prisma.EventDiscussionThreadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventDiscussionReply`: Exposes CRUD operations for the **EventDiscussionReply** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventDiscussionReplies
    * const eventDiscussionReplies = await prisma.eventDiscussionReply.findMany()
    * ```
    */
  get eventDiscussionReply(): Prisma.EventDiscussionReplyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clubMembership`: Exposes CRUD operations for the **ClubMembership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClubMemberships
    * const clubMemberships = await prisma.clubMembership.findMany()
    * ```
    */
  get clubMembership(): Prisma.ClubMembershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hubFollow`: Exposes CRUD operations for the **HubFollow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HubFollows
    * const hubFollows = await prisma.hubFollow.findMany()
    * ```
    */
  get hubFollow(): Prisma.HubFollowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hubBlock`: Exposes CRUD operations for the **HubBlock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HubBlocks
    * const hubBlocks = await prisma.hubBlock.findMany()
    * ```
    */
  get hubBlock(): Prisma.HubBlockDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rSVP`: Exposes CRUD operations for the **RSVP** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RSVPS
    * const rSVPS = await prisma.rSVP.findMany()
    * ```
    */
  get rSVP(): Prisma.RSVPDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Post: 'Post',
    Club: 'Club',
    Event: 'Event',
    Account: 'Account',
    Session: 'Session',
    User: 'User',
    EventDiscussionThread: 'EventDiscussionThread',
    EventDiscussionReply: 'EventDiscussionReply',
    ClubMembership: 'ClubMembership',
    HubFollow: 'HubFollow',
    HubBlock: 'HubBlock',
    VerificationToken: 'VerificationToken',
    RSVP: 'RSVP'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "post" | "club" | "event" | "account" | "session" | "user" | "eventDiscussionThread" | "eventDiscussionReply" | "clubMembership" | "hubFollow" | "hubBlock" | "verificationToken" | "rSVP"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      Club: {
        payload: Prisma.$ClubPayload<ExtArgs>
        fields: Prisma.ClubFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClubFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClubFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          findFirst: {
            args: Prisma.ClubFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClubFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          findMany: {
            args: Prisma.ClubFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>[]
          }
          create: {
            args: Prisma.ClubCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          createMany: {
            args: Prisma.ClubCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClubCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>[]
          }
          delete: {
            args: Prisma.ClubDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          update: {
            args: Prisma.ClubUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          deleteMany: {
            args: Prisma.ClubDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClubUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClubUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>[]
          }
          upsert: {
            args: Prisma.ClubUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          aggregate: {
            args: Prisma.ClubAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClub>
          }
          groupBy: {
            args: Prisma.ClubGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClubGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClubCountArgs<ExtArgs>
            result: $Utils.Optional<ClubCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      EventDiscussionThread: {
        payload: Prisma.$EventDiscussionThreadPayload<ExtArgs>
        fields: Prisma.EventDiscussionThreadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventDiscussionThreadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionThreadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventDiscussionThreadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionThreadPayload>
          }
          findFirst: {
            args: Prisma.EventDiscussionThreadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionThreadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventDiscussionThreadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionThreadPayload>
          }
          findMany: {
            args: Prisma.EventDiscussionThreadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionThreadPayload>[]
          }
          create: {
            args: Prisma.EventDiscussionThreadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionThreadPayload>
          }
          createMany: {
            args: Prisma.EventDiscussionThreadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventDiscussionThreadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionThreadPayload>[]
          }
          delete: {
            args: Prisma.EventDiscussionThreadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionThreadPayload>
          }
          update: {
            args: Prisma.EventDiscussionThreadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionThreadPayload>
          }
          deleteMany: {
            args: Prisma.EventDiscussionThreadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventDiscussionThreadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventDiscussionThreadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionThreadPayload>[]
          }
          upsert: {
            args: Prisma.EventDiscussionThreadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionThreadPayload>
          }
          aggregate: {
            args: Prisma.EventDiscussionThreadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventDiscussionThread>
          }
          groupBy: {
            args: Prisma.EventDiscussionThreadGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventDiscussionThreadGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventDiscussionThreadCountArgs<ExtArgs>
            result: $Utils.Optional<EventDiscussionThreadCountAggregateOutputType> | number
          }
        }
      }
      EventDiscussionReply: {
        payload: Prisma.$EventDiscussionReplyPayload<ExtArgs>
        fields: Prisma.EventDiscussionReplyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventDiscussionReplyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionReplyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventDiscussionReplyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionReplyPayload>
          }
          findFirst: {
            args: Prisma.EventDiscussionReplyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionReplyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventDiscussionReplyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionReplyPayload>
          }
          findMany: {
            args: Prisma.EventDiscussionReplyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionReplyPayload>[]
          }
          create: {
            args: Prisma.EventDiscussionReplyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionReplyPayload>
          }
          createMany: {
            args: Prisma.EventDiscussionReplyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventDiscussionReplyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionReplyPayload>[]
          }
          delete: {
            args: Prisma.EventDiscussionReplyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionReplyPayload>
          }
          update: {
            args: Prisma.EventDiscussionReplyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionReplyPayload>
          }
          deleteMany: {
            args: Prisma.EventDiscussionReplyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventDiscussionReplyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventDiscussionReplyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionReplyPayload>[]
          }
          upsert: {
            args: Prisma.EventDiscussionReplyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDiscussionReplyPayload>
          }
          aggregate: {
            args: Prisma.EventDiscussionReplyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventDiscussionReply>
          }
          groupBy: {
            args: Prisma.EventDiscussionReplyGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventDiscussionReplyGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventDiscussionReplyCountArgs<ExtArgs>
            result: $Utils.Optional<EventDiscussionReplyCountAggregateOutputType> | number
          }
        }
      }
      ClubMembership: {
        payload: Prisma.$ClubMembershipPayload<ExtArgs>
        fields: Prisma.ClubMembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClubMembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClubMembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMembershipPayload>
          }
          findFirst: {
            args: Prisma.ClubMembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClubMembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMembershipPayload>
          }
          findMany: {
            args: Prisma.ClubMembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMembershipPayload>[]
          }
          create: {
            args: Prisma.ClubMembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMembershipPayload>
          }
          createMany: {
            args: Prisma.ClubMembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClubMembershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMembershipPayload>[]
          }
          delete: {
            args: Prisma.ClubMembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMembershipPayload>
          }
          update: {
            args: Prisma.ClubMembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMembershipPayload>
          }
          deleteMany: {
            args: Prisma.ClubMembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClubMembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClubMembershipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMembershipPayload>[]
          }
          upsert: {
            args: Prisma.ClubMembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubMembershipPayload>
          }
          aggregate: {
            args: Prisma.ClubMembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClubMembership>
          }
          groupBy: {
            args: Prisma.ClubMembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClubMembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClubMembershipCountArgs<ExtArgs>
            result: $Utils.Optional<ClubMembershipCountAggregateOutputType> | number
          }
        }
      }
      HubFollow: {
        payload: Prisma.$HubFollowPayload<ExtArgs>
        fields: Prisma.HubFollowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HubFollowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubFollowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HubFollowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubFollowPayload>
          }
          findFirst: {
            args: Prisma.HubFollowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubFollowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HubFollowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubFollowPayload>
          }
          findMany: {
            args: Prisma.HubFollowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubFollowPayload>[]
          }
          create: {
            args: Prisma.HubFollowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubFollowPayload>
          }
          createMany: {
            args: Prisma.HubFollowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HubFollowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubFollowPayload>[]
          }
          delete: {
            args: Prisma.HubFollowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubFollowPayload>
          }
          update: {
            args: Prisma.HubFollowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubFollowPayload>
          }
          deleteMany: {
            args: Prisma.HubFollowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HubFollowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HubFollowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubFollowPayload>[]
          }
          upsert: {
            args: Prisma.HubFollowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubFollowPayload>
          }
          aggregate: {
            args: Prisma.HubFollowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHubFollow>
          }
          groupBy: {
            args: Prisma.HubFollowGroupByArgs<ExtArgs>
            result: $Utils.Optional<HubFollowGroupByOutputType>[]
          }
          count: {
            args: Prisma.HubFollowCountArgs<ExtArgs>
            result: $Utils.Optional<HubFollowCountAggregateOutputType> | number
          }
        }
      }
      HubBlock: {
        payload: Prisma.$HubBlockPayload<ExtArgs>
        fields: Prisma.HubBlockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HubBlockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubBlockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HubBlockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubBlockPayload>
          }
          findFirst: {
            args: Prisma.HubBlockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubBlockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HubBlockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubBlockPayload>
          }
          findMany: {
            args: Prisma.HubBlockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubBlockPayload>[]
          }
          create: {
            args: Prisma.HubBlockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubBlockPayload>
          }
          createMany: {
            args: Prisma.HubBlockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HubBlockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubBlockPayload>[]
          }
          delete: {
            args: Prisma.HubBlockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubBlockPayload>
          }
          update: {
            args: Prisma.HubBlockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubBlockPayload>
          }
          deleteMany: {
            args: Prisma.HubBlockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HubBlockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HubBlockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubBlockPayload>[]
          }
          upsert: {
            args: Prisma.HubBlockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HubBlockPayload>
          }
          aggregate: {
            args: Prisma.HubBlockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHubBlock>
          }
          groupBy: {
            args: Prisma.HubBlockGroupByArgs<ExtArgs>
            result: $Utils.Optional<HubBlockGroupByOutputType>[]
          }
          count: {
            args: Prisma.HubBlockCountArgs<ExtArgs>
            result: $Utils.Optional<HubBlockCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      RSVP: {
        payload: Prisma.$RSVPPayload<ExtArgs>
        fields: Prisma.RSVPFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RSVPFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RSVPPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RSVPFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RSVPPayload>
          }
          findFirst: {
            args: Prisma.RSVPFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RSVPPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RSVPFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RSVPPayload>
          }
          findMany: {
            args: Prisma.RSVPFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RSVPPayload>[]
          }
          create: {
            args: Prisma.RSVPCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RSVPPayload>
          }
          createMany: {
            args: Prisma.RSVPCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RSVPCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RSVPPayload>[]
          }
          delete: {
            args: Prisma.RSVPDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RSVPPayload>
          }
          update: {
            args: Prisma.RSVPUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RSVPPayload>
          }
          deleteMany: {
            args: Prisma.RSVPDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RSVPUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RSVPUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RSVPPayload>[]
          }
          upsert: {
            args: Prisma.RSVPUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RSVPPayload>
          }
          aggregate: {
            args: Prisma.RSVPAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRSVP>
          }
          groupBy: {
            args: Prisma.RSVPGroupByArgs<ExtArgs>
            result: $Utils.Optional<RSVPGroupByOutputType>[]
          }
          count: {
            args: Prisma.RSVPCountArgs<ExtArgs>
            result: $Utils.Optional<RSVPCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    post?: PostOmit
    club?: ClubOmit
    event?: EventOmit
    account?: AccountOmit
    session?: SessionOmit
    user?: UserOmit
    eventDiscussionThread?: EventDiscussionThreadOmit
    eventDiscussionReply?: EventDiscussionReplyOmit
    clubMembership?: ClubMembershipOmit
    hubFollow?: HubFollowOmit
    hubBlock?: HubBlockOmit
    verificationToken?: VerificationTokenOmit
    rSVP?: RSVPOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClubCountOutputType
   */

  export type ClubCountOutputType = {
    events: number
    followers: number
    blocks: number
    members: number
  }

  export type ClubCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | ClubCountOutputTypeCountEventsArgs
    followers?: boolean | ClubCountOutputTypeCountFollowersArgs
    blocks?: boolean | ClubCountOutputTypeCountBlocksArgs
    members?: boolean | ClubCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * ClubCountOutputType without action
   */
  export type ClubCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubCountOutputType
     */
    select?: ClubCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClubCountOutputType without action
   */
  export type ClubCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * ClubCountOutputType without action
   */
  export type ClubCountOutputTypeCountFollowersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HubFollowWhereInput
  }

  /**
   * ClubCountOutputType without action
   */
  export type ClubCountOutputTypeCountBlocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HubBlockWhereInput
  }

  /**
   * ClubCountOutputType without action
   */
  export type ClubCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClubMembershipWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    rsvps: number
    discussionThreads: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rsvps?: boolean | EventCountOutputTypeCountRsvpsArgs
    discussionThreads?: boolean | EventCountOutputTypeCountDiscussionThreadsArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountRsvpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RSVPWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountDiscussionThreadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDiscussionThreadWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    posts: number
    authoredEvents: number
    rsvps: number
    authoredDiscussionThreads: number
    authoredDiscussionReplies: number
    followedHubs: number
    clubMemberships: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    posts?: boolean | UserCountOutputTypeCountPostsArgs
    authoredEvents?: boolean | UserCountOutputTypeCountAuthoredEventsArgs
    rsvps?: boolean | UserCountOutputTypeCountRsvpsArgs
    authoredDiscussionThreads?: boolean | UserCountOutputTypeCountAuthoredDiscussionThreadsArgs
    authoredDiscussionReplies?: boolean | UserCountOutputTypeCountAuthoredDiscussionRepliesArgs
    followedHubs?: boolean | UserCountOutputTypeCountFollowedHubsArgs
    clubMemberships?: boolean | UserCountOutputTypeCountClubMembershipsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthoredEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRsvpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RSVPWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthoredDiscussionThreadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDiscussionThreadWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthoredDiscussionRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDiscussionReplyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowedHubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HubFollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClubMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClubMembershipWhereInput
  }


  /**
   * Count Type EventDiscussionThreadCountOutputType
   */

  export type EventDiscussionThreadCountOutputType = {
    replies: number
  }

  export type EventDiscussionThreadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | EventDiscussionThreadCountOutputTypeCountRepliesArgs
  }

  // Custom InputTypes
  /**
   * EventDiscussionThreadCountOutputType without action
   */
  export type EventDiscussionThreadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThreadCountOutputType
     */
    select?: EventDiscussionThreadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventDiscussionThreadCountOutputType without action
   */
  export type EventDiscussionThreadCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDiscussionReplyWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
  }

  export type PostSumAggregateOutputType = {
    id: number | null
  }

  export type PostMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type PostMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    createdById: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    createdById: string
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt" | "createdById", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
      createdById: string
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'Int'>
    readonly name: FieldRef<"Post", 'String'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
    readonly createdById: FieldRef<"Post", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model Club
   */

  export type AggregateClub = {
    _count: ClubCountAggregateOutputType | null
    _avg: ClubAvgAggregateOutputType | null
    _sum: ClubSumAggregateOutputType | null
    _min: ClubMinAggregateOutputType | null
    _max: ClubMaxAggregateOutputType | null
  }

  export type ClubAvgAggregateOutputType = {
    id: number | null
  }

  export type ClubSumAggregateOutputType = {
    id: number | null
  }

  export type ClubMinAggregateOutputType = {
    id: number | null
    name: string | null
    logoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClubMaxAggregateOutputType = {
    id: number | null
    name: string | null
    logoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClubCountAggregateOutputType = {
    id: number
    name: number
    logoUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClubAvgAggregateInputType = {
    id?: true
  }

  export type ClubSumAggregateInputType = {
    id?: true
  }

  export type ClubMinAggregateInputType = {
    id?: true
    name?: true
    logoUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClubMaxAggregateInputType = {
    id?: true
    name?: true
    logoUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClubCountAggregateInputType = {
    id?: true
    name?: true
    logoUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClubAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Club to aggregate.
     */
    where?: ClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clubs
    **/
    _count?: true | ClubCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClubAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClubSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClubMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClubMaxAggregateInputType
  }

  export type GetClubAggregateType<T extends ClubAggregateArgs> = {
        [P in keyof T & keyof AggregateClub]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClub[P]>
      : GetScalarType<T[P], AggregateClub[P]>
  }




  export type ClubGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClubWhereInput
    orderBy?: ClubOrderByWithAggregationInput | ClubOrderByWithAggregationInput[]
    by: ClubScalarFieldEnum[] | ClubScalarFieldEnum
    having?: ClubScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClubCountAggregateInputType | true
    _avg?: ClubAvgAggregateInputType
    _sum?: ClubSumAggregateInputType
    _min?: ClubMinAggregateInputType
    _max?: ClubMaxAggregateInputType
  }

  export type ClubGroupByOutputType = {
    id: number
    name: string
    logoUrl: string
    createdAt: Date
    updatedAt: Date
    _count: ClubCountAggregateOutputType | null
    _avg: ClubAvgAggregateOutputType | null
    _sum: ClubSumAggregateOutputType | null
    _min: ClubMinAggregateOutputType | null
    _max: ClubMaxAggregateOutputType | null
  }

  type GetClubGroupByPayload<T extends ClubGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClubGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClubGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClubGroupByOutputType[P]>
            : GetScalarType<T[P], ClubGroupByOutputType[P]>
        }
      >
    >


  export type ClubSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    events?: boolean | Club$eventsArgs<ExtArgs>
    followers?: boolean | Club$followersArgs<ExtArgs>
    blocks?: boolean | Club$blocksArgs<ExtArgs>
    members?: boolean | Club$membersArgs<ExtArgs>
    _count?: boolean | ClubCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["club"]>

  export type ClubSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["club"]>

  export type ClubSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["club"]>

  export type ClubSelectScalar = {
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClubOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "logoUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["club"]>
  export type ClubInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | Club$eventsArgs<ExtArgs>
    followers?: boolean | Club$followersArgs<ExtArgs>
    blocks?: boolean | Club$blocksArgs<ExtArgs>
    members?: boolean | Club$membersArgs<ExtArgs>
    _count?: boolean | ClubCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClubIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClubIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClubPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Club"
    objects: {
      events: Prisma.$EventPayload<ExtArgs>[]
      followers: Prisma.$HubFollowPayload<ExtArgs>[]
      blocks: Prisma.$HubBlockPayload<ExtArgs>[]
      members: Prisma.$ClubMembershipPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      logoUrl: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["club"]>
    composites: {}
  }

  type ClubGetPayload<S extends boolean | null | undefined | ClubDefaultArgs> = $Result.GetResult<Prisma.$ClubPayload, S>

  type ClubCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClubFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClubCountAggregateInputType | true
    }

  export interface ClubDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Club'], meta: { name: 'Club' } }
    /**
     * Find zero or one Club that matches the filter.
     * @param {ClubFindUniqueArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClubFindUniqueArgs>(args: SelectSubset<T, ClubFindUniqueArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Club that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClubFindUniqueOrThrowArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClubFindUniqueOrThrowArgs>(args: SelectSubset<T, ClubFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Club that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubFindFirstArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClubFindFirstArgs>(args?: SelectSubset<T, ClubFindFirstArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Club that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubFindFirstOrThrowArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClubFindFirstOrThrowArgs>(args?: SelectSubset<T, ClubFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clubs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clubs
     * const clubs = await prisma.club.findMany()
     * 
     * // Get first 10 Clubs
     * const clubs = await prisma.club.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clubWithIdOnly = await prisma.club.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClubFindManyArgs>(args?: SelectSubset<T, ClubFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Club.
     * @param {ClubCreateArgs} args - Arguments to create a Club.
     * @example
     * // Create one Club
     * const Club = await prisma.club.create({
     *   data: {
     *     // ... data to create a Club
     *   }
     * })
     * 
     */
    create<T extends ClubCreateArgs>(args: SelectSubset<T, ClubCreateArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clubs.
     * @param {ClubCreateManyArgs} args - Arguments to create many Clubs.
     * @example
     * // Create many Clubs
     * const club = await prisma.club.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClubCreateManyArgs>(args?: SelectSubset<T, ClubCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clubs and returns the data saved in the database.
     * @param {ClubCreateManyAndReturnArgs} args - Arguments to create many Clubs.
     * @example
     * // Create many Clubs
     * const club = await prisma.club.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clubs and only return the `id`
     * const clubWithIdOnly = await prisma.club.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClubCreateManyAndReturnArgs>(args?: SelectSubset<T, ClubCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Club.
     * @param {ClubDeleteArgs} args - Arguments to delete one Club.
     * @example
     * // Delete one Club
     * const Club = await prisma.club.delete({
     *   where: {
     *     // ... filter to delete one Club
     *   }
     * })
     * 
     */
    delete<T extends ClubDeleteArgs>(args: SelectSubset<T, ClubDeleteArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Club.
     * @param {ClubUpdateArgs} args - Arguments to update one Club.
     * @example
     * // Update one Club
     * const club = await prisma.club.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClubUpdateArgs>(args: SelectSubset<T, ClubUpdateArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clubs.
     * @param {ClubDeleteManyArgs} args - Arguments to filter Clubs to delete.
     * @example
     * // Delete a few Clubs
     * const { count } = await prisma.club.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClubDeleteManyArgs>(args?: SelectSubset<T, ClubDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clubs
     * const club = await prisma.club.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClubUpdateManyArgs>(args: SelectSubset<T, ClubUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clubs and returns the data updated in the database.
     * @param {ClubUpdateManyAndReturnArgs} args - Arguments to update many Clubs.
     * @example
     * // Update many Clubs
     * const club = await prisma.club.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clubs and only return the `id`
     * const clubWithIdOnly = await prisma.club.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClubUpdateManyAndReturnArgs>(args: SelectSubset<T, ClubUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Club.
     * @param {ClubUpsertArgs} args - Arguments to update or create a Club.
     * @example
     * // Update or create a Club
     * const club = await prisma.club.upsert({
     *   create: {
     *     // ... data to create a Club
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Club we want to update
     *   }
     * })
     */
    upsert<T extends ClubUpsertArgs>(args: SelectSubset<T, ClubUpsertArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubCountArgs} args - Arguments to filter Clubs to count.
     * @example
     * // Count the number of Clubs
     * const count = await prisma.club.count({
     *   where: {
     *     // ... the filter for the Clubs we want to count
     *   }
     * })
    **/
    count<T extends ClubCountArgs>(
      args?: Subset<T, ClubCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClubCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Club.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClubAggregateArgs>(args: Subset<T, ClubAggregateArgs>): Prisma.PrismaPromise<GetClubAggregateType<T>>

    /**
     * Group by Club.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClubGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClubGroupByArgs['orderBy'] }
        : { orderBy?: ClubGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClubGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClubGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Club model
   */
  readonly fields: ClubFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Club.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClubClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends Club$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Club$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    followers<T extends Club$followersArgs<ExtArgs> = {}>(args?: Subset<T, Club$followersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    blocks<T extends Club$blocksArgs<ExtArgs> = {}>(args?: Subset<T, Club$blocksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HubBlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    members<T extends Club$membersArgs<ExtArgs> = {}>(args?: Subset<T, Club$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Club model
   */
  interface ClubFieldRefs {
    readonly id: FieldRef<"Club", 'Int'>
    readonly name: FieldRef<"Club", 'String'>
    readonly logoUrl: FieldRef<"Club", 'String'>
    readonly createdAt: FieldRef<"Club", 'DateTime'>
    readonly updatedAt: FieldRef<"Club", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Club findUnique
   */
  export type ClubFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Club to fetch.
     */
    where: ClubWhereUniqueInput
  }

  /**
   * Club findUniqueOrThrow
   */
  export type ClubFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Club to fetch.
     */
    where: ClubWhereUniqueInput
  }

  /**
   * Club findFirst
   */
  export type ClubFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Club to fetch.
     */
    where?: ClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clubs.
     */
    cursor?: ClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clubs.
     */
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[]
  }

  /**
   * Club findFirstOrThrow
   */
  export type ClubFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Club to fetch.
     */
    where?: ClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clubs.
     */
    cursor?: ClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clubs.
     */
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[]
  }

  /**
   * Club findMany
   */
  export type ClubFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Clubs to fetch.
     */
    where?: ClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clubs.
     */
    cursor?: ClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clubs.
     */
    skip?: number
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[]
  }

  /**
   * Club create
   */
  export type ClubCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * The data needed to create a Club.
     */
    data: XOR<ClubCreateInput, ClubUncheckedCreateInput>
  }

  /**
   * Club createMany
   */
  export type ClubCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clubs.
     */
    data: ClubCreateManyInput | ClubCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Club createManyAndReturn
   */
  export type ClubCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * The data used to create many Clubs.
     */
    data: ClubCreateManyInput | ClubCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Club update
   */
  export type ClubUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * The data needed to update a Club.
     */
    data: XOR<ClubUpdateInput, ClubUncheckedUpdateInput>
    /**
     * Choose, which Club to update.
     */
    where: ClubWhereUniqueInput
  }

  /**
   * Club updateMany
   */
  export type ClubUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clubs.
     */
    data: XOR<ClubUpdateManyMutationInput, ClubUncheckedUpdateManyInput>
    /**
     * Filter which Clubs to update
     */
    where?: ClubWhereInput
    /**
     * Limit how many Clubs to update.
     */
    limit?: number
  }

  /**
   * Club updateManyAndReturn
   */
  export type ClubUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * The data used to update Clubs.
     */
    data: XOR<ClubUpdateManyMutationInput, ClubUncheckedUpdateManyInput>
    /**
     * Filter which Clubs to update
     */
    where?: ClubWhereInput
    /**
     * Limit how many Clubs to update.
     */
    limit?: number
  }

  /**
   * Club upsert
   */
  export type ClubUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * The filter to search for the Club to update in case it exists.
     */
    where: ClubWhereUniqueInput
    /**
     * In case the Club found by the `where` argument doesn't exist, create a new Club with this data.
     */
    create: XOR<ClubCreateInput, ClubUncheckedCreateInput>
    /**
     * In case the Club was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClubUpdateInput, ClubUncheckedUpdateInput>
  }

  /**
   * Club delete
   */
  export type ClubDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter which Club to delete.
     */
    where: ClubWhereUniqueInput
  }

  /**
   * Club deleteMany
   */
  export type ClubDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clubs to delete
     */
    where?: ClubWhereInput
    /**
     * Limit how many Clubs to delete.
     */
    limit?: number
  }

  /**
   * Club.events
   */
  export type Club$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Club.followers
   */
  export type Club$followersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowInclude<ExtArgs> | null
    where?: HubFollowWhereInput
    orderBy?: HubFollowOrderByWithRelationInput | HubFollowOrderByWithRelationInput[]
    cursor?: HubFollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HubFollowScalarFieldEnum | HubFollowScalarFieldEnum[]
  }

  /**
   * Club.blocks
   */
  export type Club$blocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockInclude<ExtArgs> | null
    where?: HubBlockWhereInput
    orderBy?: HubBlockOrderByWithRelationInput | HubBlockOrderByWithRelationInput[]
    cursor?: HubBlockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HubBlockScalarFieldEnum | HubBlockScalarFieldEnum[]
  }

  /**
   * Club.members
   */
  export type Club$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipInclude<ExtArgs> | null
    where?: ClubMembershipWhereInput
    orderBy?: ClubMembershipOrderByWithRelationInput | ClubMembershipOrderByWithRelationInput[]
    cursor?: ClubMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClubMembershipScalarFieldEnum | ClubMembershipScalarFieldEnum[]
  }

  /**
   * Club without action
   */
  export type ClubDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    id: number | null
    capacity: number | null
    clubId: number | null
  }

  export type EventSumAggregateOutputType = {
    id: number | null
    capacity: number | null
    clubId: number | null
  }

  export type EventMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    status: $Enums.EventStatus | null
    date: Date | null
    capacity: number | null
    location: string | null
    imageUrl: string | null
    clubId: number | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    status: $Enums.EventStatus | null
    date: Date | null
    capacity: number | null
    location: string | null
    imageUrl: string | null
    clubId: number | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    date: number
    capacity: number
    location: number
    imageUrl: number
    clubId: number
    authorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    id?: true
    capacity?: true
    clubId?: true
  }

  export type EventSumAggregateInputType = {
    id?: true
    capacity?: true
    clubId?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    date?: true
    capacity?: true
    location?: true
    imageUrl?: true
    clubId?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    date?: true
    capacity?: true
    location?: true
    imageUrl?: true
    clubId?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    date?: true
    capacity?: true
    location?: true
    imageUrl?: true
    clubId?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: number
    title: string
    description: string
    status: $Enums.EventStatus
    date: Date
    capacity: number
    location: string
    imageUrl: string
    clubId: number
    authorId: string
    createdAt: Date
    updatedAt: Date
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    date?: boolean
    capacity?: boolean
    location?: boolean
    imageUrl?: boolean
    clubId?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
    rsvps?: boolean | Event$rsvpsArgs<ExtArgs>
    discussionThreads?: boolean | Event$discussionThreadsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    date?: boolean
    capacity?: boolean
    location?: boolean
    imageUrl?: boolean
    clubId?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    date?: boolean
    capacity?: boolean
    location?: boolean
    imageUrl?: boolean
    clubId?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    date?: boolean
    capacity?: boolean
    location?: boolean
    imageUrl?: boolean
    clubId?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "date" | "capacity" | "location" | "imageUrl" | "clubId" | "authorId" | "createdAt" | "updatedAt", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
    rsvps?: boolean | Event$rsvpsArgs<ExtArgs>
    discussionThreads?: boolean | Event$discussionThreadsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      club: Prisma.$ClubPayload<ExtArgs>
      rsvps: Prisma.$RSVPPayload<ExtArgs>[]
      discussionThreads: Prisma.$EventDiscussionThreadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      status: $Enums.EventStatus
      date: Date
      capacity: number
      location: string
      imageUrl: string
      clubId: number
      authorId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    club<T extends ClubDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClubDefaultArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rsvps<T extends Event$rsvpsArgs<ExtArgs> = {}>(args?: Subset<T, Event$rsvpsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    discussionThreads<T extends Event$discussionThreadsArgs<ExtArgs> = {}>(args?: Subset<T, Event$discussionThreadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'Int'>
    readonly title: FieldRef<"Event", 'String'>
    readonly description: FieldRef<"Event", 'String'>
    readonly status: FieldRef<"Event", 'EventStatus'>
    readonly date: FieldRef<"Event", 'DateTime'>
    readonly capacity: FieldRef<"Event", 'Int'>
    readonly location: FieldRef<"Event", 'String'>
    readonly imageUrl: FieldRef<"Event", 'String'>
    readonly clubId: FieldRef<"Event", 'Int'>
    readonly authorId: FieldRef<"Event", 'String'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly updatedAt: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.rsvps
   */
  export type Event$rsvpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPInclude<ExtArgs> | null
    where?: RSVPWhereInput
    orderBy?: RSVPOrderByWithRelationInput | RSVPOrderByWithRelationInput[]
    cursor?: RSVPWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RSVPScalarFieldEnum | RSVPScalarFieldEnum[]
  }

  /**
   * Event.discussionThreads
   */
  export type Event$discussionThreadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadInclude<ExtArgs> | null
    where?: EventDiscussionThreadWhereInput
    orderBy?: EventDiscussionThreadOrderByWithRelationInput | EventDiscussionThreadOrderByWithRelationInput[]
    cursor?: EventDiscussionThreadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventDiscussionThreadScalarFieldEnum | EventDiscussionThreadScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    refresh_token_expires_in: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "refresh_token_expires_in", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      refresh_token_expires_in: number | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly refresh_token_expires_in: FieldRef<"Account", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    role: $Enums.Role | null
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
  }

  export type UserMaxAggregateOutputType = {
    role: $Enums.Role | null
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
  }

  export type UserCountAggregateOutputType = {
    role: number
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    password: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    role?: true
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
  }

  export type UserMaxAggregateInputType = {
    role?: true
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
  }

  export type UserCountAggregateInputType = {
    role?: true
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    role: $Enums.Role
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role?: boolean
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    authoredEvents?: boolean | User$authoredEventsArgs<ExtArgs>
    rsvps?: boolean | User$rsvpsArgs<ExtArgs>
    authoredDiscussionThreads?: boolean | User$authoredDiscussionThreadsArgs<ExtArgs>
    authoredDiscussionReplies?: boolean | User$authoredDiscussionRepliesArgs<ExtArgs>
    followedHubs?: boolean | User$followedHubsArgs<ExtArgs>
    clubMemberships?: boolean | User$clubMembershipsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role?: boolean
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role?: boolean
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    role?: boolean
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"role" | "id" | "name" | "email" | "emailVerified" | "image" | "password", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    authoredEvents?: boolean | User$authoredEventsArgs<ExtArgs>
    rsvps?: boolean | User$rsvpsArgs<ExtArgs>
    authoredDiscussionThreads?: boolean | User$authoredDiscussionThreadsArgs<ExtArgs>
    authoredDiscussionReplies?: boolean | User$authoredDiscussionRepliesArgs<ExtArgs>
    followedHubs?: boolean | User$followedHubsArgs<ExtArgs>
    clubMemberships?: boolean | User$clubMembershipsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
      authoredEvents: Prisma.$EventPayload<ExtArgs>[]
      rsvps: Prisma.$RSVPPayload<ExtArgs>[]
      authoredDiscussionThreads: Prisma.$EventDiscussionThreadPayload<ExtArgs>[]
      authoredDiscussionReplies: Prisma.$EventDiscussionReplyPayload<ExtArgs>[]
      followedHubs: Prisma.$HubFollowPayload<ExtArgs>[]
      clubMemberships: Prisma.$ClubMembershipPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      role: $Enums.Role
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      password: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    authoredEvents<T extends User$authoredEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$authoredEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rsvps<T extends User$rsvpsArgs<ExtArgs> = {}>(args?: Subset<T, User$rsvpsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    authoredDiscussionThreads<T extends User$authoredDiscussionThreadsArgs<ExtArgs> = {}>(args?: Subset<T, User$authoredDiscussionThreadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    authoredDiscussionReplies<T extends User$authoredDiscussionRepliesArgs<ExtArgs> = {}>(args?: Subset<T, User$authoredDiscussionRepliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    followedHubs<T extends User$followedHubsArgs<ExtArgs> = {}>(args?: Subset<T, User$followedHubsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clubMemberships<T extends User$clubMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$clubMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly role: FieldRef<"User", 'Role'>
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.posts
   */
  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User.authoredEvents
   */
  export type User$authoredEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * User.rsvps
   */
  export type User$rsvpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPInclude<ExtArgs> | null
    where?: RSVPWhereInput
    orderBy?: RSVPOrderByWithRelationInput | RSVPOrderByWithRelationInput[]
    cursor?: RSVPWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RSVPScalarFieldEnum | RSVPScalarFieldEnum[]
  }

  /**
   * User.authoredDiscussionThreads
   */
  export type User$authoredDiscussionThreadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadInclude<ExtArgs> | null
    where?: EventDiscussionThreadWhereInput
    orderBy?: EventDiscussionThreadOrderByWithRelationInput | EventDiscussionThreadOrderByWithRelationInput[]
    cursor?: EventDiscussionThreadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventDiscussionThreadScalarFieldEnum | EventDiscussionThreadScalarFieldEnum[]
  }

  /**
   * User.authoredDiscussionReplies
   */
  export type User$authoredDiscussionRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyInclude<ExtArgs> | null
    where?: EventDiscussionReplyWhereInput
    orderBy?: EventDiscussionReplyOrderByWithRelationInput | EventDiscussionReplyOrderByWithRelationInput[]
    cursor?: EventDiscussionReplyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventDiscussionReplyScalarFieldEnum | EventDiscussionReplyScalarFieldEnum[]
  }

  /**
   * User.followedHubs
   */
  export type User$followedHubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowInclude<ExtArgs> | null
    where?: HubFollowWhereInput
    orderBy?: HubFollowOrderByWithRelationInput | HubFollowOrderByWithRelationInput[]
    cursor?: HubFollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HubFollowScalarFieldEnum | HubFollowScalarFieldEnum[]
  }

  /**
   * User.clubMemberships
   */
  export type User$clubMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipInclude<ExtArgs> | null
    where?: ClubMembershipWhereInput
    orderBy?: ClubMembershipOrderByWithRelationInput | ClubMembershipOrderByWithRelationInput[]
    cursor?: ClubMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClubMembershipScalarFieldEnum | ClubMembershipScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model EventDiscussionThread
   */

  export type AggregateEventDiscussionThread = {
    _count: EventDiscussionThreadCountAggregateOutputType | null
    _avg: EventDiscussionThreadAvgAggregateOutputType | null
    _sum: EventDiscussionThreadSumAggregateOutputType | null
    _min: EventDiscussionThreadMinAggregateOutputType | null
    _max: EventDiscussionThreadMaxAggregateOutputType | null
  }

  export type EventDiscussionThreadAvgAggregateOutputType = {
    id: number | null
    eventId: number | null
  }

  export type EventDiscussionThreadSumAggregateOutputType = {
    id: number | null
    eventId: number | null
  }

  export type EventDiscussionThreadMinAggregateOutputType = {
    id: number | null
    eventId: number | null
    authorId: string | null
    question: string | null
    pinned: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventDiscussionThreadMaxAggregateOutputType = {
    id: number | null
    eventId: number | null
    authorId: string | null
    question: string | null
    pinned: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventDiscussionThreadCountAggregateOutputType = {
    id: number
    eventId: number
    authorId: number
    question: number
    pinned: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventDiscussionThreadAvgAggregateInputType = {
    id?: true
    eventId?: true
  }

  export type EventDiscussionThreadSumAggregateInputType = {
    id?: true
    eventId?: true
  }

  export type EventDiscussionThreadMinAggregateInputType = {
    id?: true
    eventId?: true
    authorId?: true
    question?: true
    pinned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventDiscussionThreadMaxAggregateInputType = {
    id?: true
    eventId?: true
    authorId?: true
    question?: true
    pinned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventDiscussionThreadCountAggregateInputType = {
    id?: true
    eventId?: true
    authorId?: true
    question?: true
    pinned?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventDiscussionThreadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventDiscussionThread to aggregate.
     */
    where?: EventDiscussionThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDiscussionThreads to fetch.
     */
    orderBy?: EventDiscussionThreadOrderByWithRelationInput | EventDiscussionThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventDiscussionThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDiscussionThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDiscussionThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventDiscussionThreads
    **/
    _count?: true | EventDiscussionThreadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventDiscussionThreadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventDiscussionThreadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventDiscussionThreadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventDiscussionThreadMaxAggregateInputType
  }

  export type GetEventDiscussionThreadAggregateType<T extends EventDiscussionThreadAggregateArgs> = {
        [P in keyof T & keyof AggregateEventDiscussionThread]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventDiscussionThread[P]>
      : GetScalarType<T[P], AggregateEventDiscussionThread[P]>
  }




  export type EventDiscussionThreadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDiscussionThreadWhereInput
    orderBy?: EventDiscussionThreadOrderByWithAggregationInput | EventDiscussionThreadOrderByWithAggregationInput[]
    by: EventDiscussionThreadScalarFieldEnum[] | EventDiscussionThreadScalarFieldEnum
    having?: EventDiscussionThreadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventDiscussionThreadCountAggregateInputType | true
    _avg?: EventDiscussionThreadAvgAggregateInputType
    _sum?: EventDiscussionThreadSumAggregateInputType
    _min?: EventDiscussionThreadMinAggregateInputType
    _max?: EventDiscussionThreadMaxAggregateInputType
  }

  export type EventDiscussionThreadGroupByOutputType = {
    id: number
    eventId: number
    authorId: string
    question: string
    pinned: boolean
    createdAt: Date
    updatedAt: Date
    _count: EventDiscussionThreadCountAggregateOutputType | null
    _avg: EventDiscussionThreadAvgAggregateOutputType | null
    _sum: EventDiscussionThreadSumAggregateOutputType | null
    _min: EventDiscussionThreadMinAggregateOutputType | null
    _max: EventDiscussionThreadMaxAggregateOutputType | null
  }

  type GetEventDiscussionThreadGroupByPayload<T extends EventDiscussionThreadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventDiscussionThreadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventDiscussionThreadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventDiscussionThreadGroupByOutputType[P]>
            : GetScalarType<T[P], EventDiscussionThreadGroupByOutputType[P]>
        }
      >
    >


  export type EventDiscussionThreadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    authorId?: boolean
    question?: boolean
    pinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    replies?: boolean | EventDiscussionThread$repliesArgs<ExtArgs>
    _count?: boolean | EventDiscussionThreadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDiscussionThread"]>

  export type EventDiscussionThreadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    authorId?: boolean
    question?: boolean
    pinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDiscussionThread"]>

  export type EventDiscussionThreadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    authorId?: boolean
    question?: boolean
    pinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDiscussionThread"]>

  export type EventDiscussionThreadSelectScalar = {
    id?: boolean
    eventId?: boolean
    authorId?: boolean
    question?: boolean
    pinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventDiscussionThreadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "authorId" | "question" | "pinned" | "createdAt" | "updatedAt", ExtArgs["result"]["eventDiscussionThread"]>
  export type EventDiscussionThreadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    replies?: boolean | EventDiscussionThread$repliesArgs<ExtArgs>
    _count?: boolean | EventDiscussionThreadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventDiscussionThreadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EventDiscussionThreadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EventDiscussionThreadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventDiscussionThread"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
      replies: Prisma.$EventDiscussionReplyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      eventId: number
      authorId: string
      question: string
      pinned: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["eventDiscussionThread"]>
    composites: {}
  }

  type EventDiscussionThreadGetPayload<S extends boolean | null | undefined | EventDiscussionThreadDefaultArgs> = $Result.GetResult<Prisma.$EventDiscussionThreadPayload, S>

  type EventDiscussionThreadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventDiscussionThreadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventDiscussionThreadCountAggregateInputType | true
    }

  export interface EventDiscussionThreadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventDiscussionThread'], meta: { name: 'EventDiscussionThread' } }
    /**
     * Find zero or one EventDiscussionThread that matches the filter.
     * @param {EventDiscussionThreadFindUniqueArgs} args - Arguments to find a EventDiscussionThread
     * @example
     * // Get one EventDiscussionThread
     * const eventDiscussionThread = await prisma.eventDiscussionThread.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventDiscussionThreadFindUniqueArgs>(args: SelectSubset<T, EventDiscussionThreadFindUniqueArgs<ExtArgs>>): Prisma__EventDiscussionThreadClient<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventDiscussionThread that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventDiscussionThreadFindUniqueOrThrowArgs} args - Arguments to find a EventDiscussionThread
     * @example
     * // Get one EventDiscussionThread
     * const eventDiscussionThread = await prisma.eventDiscussionThread.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventDiscussionThreadFindUniqueOrThrowArgs>(args: SelectSubset<T, EventDiscussionThreadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventDiscussionThreadClient<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventDiscussionThread that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionThreadFindFirstArgs} args - Arguments to find a EventDiscussionThread
     * @example
     * // Get one EventDiscussionThread
     * const eventDiscussionThread = await prisma.eventDiscussionThread.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventDiscussionThreadFindFirstArgs>(args?: SelectSubset<T, EventDiscussionThreadFindFirstArgs<ExtArgs>>): Prisma__EventDiscussionThreadClient<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventDiscussionThread that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionThreadFindFirstOrThrowArgs} args - Arguments to find a EventDiscussionThread
     * @example
     * // Get one EventDiscussionThread
     * const eventDiscussionThread = await prisma.eventDiscussionThread.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventDiscussionThreadFindFirstOrThrowArgs>(args?: SelectSubset<T, EventDiscussionThreadFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventDiscussionThreadClient<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventDiscussionThreads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionThreadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventDiscussionThreads
     * const eventDiscussionThreads = await prisma.eventDiscussionThread.findMany()
     * 
     * // Get first 10 EventDiscussionThreads
     * const eventDiscussionThreads = await prisma.eventDiscussionThread.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventDiscussionThreadWithIdOnly = await prisma.eventDiscussionThread.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventDiscussionThreadFindManyArgs>(args?: SelectSubset<T, EventDiscussionThreadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventDiscussionThread.
     * @param {EventDiscussionThreadCreateArgs} args - Arguments to create a EventDiscussionThread.
     * @example
     * // Create one EventDiscussionThread
     * const EventDiscussionThread = await prisma.eventDiscussionThread.create({
     *   data: {
     *     // ... data to create a EventDiscussionThread
     *   }
     * })
     * 
     */
    create<T extends EventDiscussionThreadCreateArgs>(args: SelectSubset<T, EventDiscussionThreadCreateArgs<ExtArgs>>): Prisma__EventDiscussionThreadClient<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventDiscussionThreads.
     * @param {EventDiscussionThreadCreateManyArgs} args - Arguments to create many EventDiscussionThreads.
     * @example
     * // Create many EventDiscussionThreads
     * const eventDiscussionThread = await prisma.eventDiscussionThread.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventDiscussionThreadCreateManyArgs>(args?: SelectSubset<T, EventDiscussionThreadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventDiscussionThreads and returns the data saved in the database.
     * @param {EventDiscussionThreadCreateManyAndReturnArgs} args - Arguments to create many EventDiscussionThreads.
     * @example
     * // Create many EventDiscussionThreads
     * const eventDiscussionThread = await prisma.eventDiscussionThread.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventDiscussionThreads and only return the `id`
     * const eventDiscussionThreadWithIdOnly = await prisma.eventDiscussionThread.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventDiscussionThreadCreateManyAndReturnArgs>(args?: SelectSubset<T, EventDiscussionThreadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventDiscussionThread.
     * @param {EventDiscussionThreadDeleteArgs} args - Arguments to delete one EventDiscussionThread.
     * @example
     * // Delete one EventDiscussionThread
     * const EventDiscussionThread = await prisma.eventDiscussionThread.delete({
     *   where: {
     *     // ... filter to delete one EventDiscussionThread
     *   }
     * })
     * 
     */
    delete<T extends EventDiscussionThreadDeleteArgs>(args: SelectSubset<T, EventDiscussionThreadDeleteArgs<ExtArgs>>): Prisma__EventDiscussionThreadClient<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventDiscussionThread.
     * @param {EventDiscussionThreadUpdateArgs} args - Arguments to update one EventDiscussionThread.
     * @example
     * // Update one EventDiscussionThread
     * const eventDiscussionThread = await prisma.eventDiscussionThread.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventDiscussionThreadUpdateArgs>(args: SelectSubset<T, EventDiscussionThreadUpdateArgs<ExtArgs>>): Prisma__EventDiscussionThreadClient<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventDiscussionThreads.
     * @param {EventDiscussionThreadDeleteManyArgs} args - Arguments to filter EventDiscussionThreads to delete.
     * @example
     * // Delete a few EventDiscussionThreads
     * const { count } = await prisma.eventDiscussionThread.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDiscussionThreadDeleteManyArgs>(args?: SelectSubset<T, EventDiscussionThreadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventDiscussionThreads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionThreadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventDiscussionThreads
     * const eventDiscussionThread = await prisma.eventDiscussionThread.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventDiscussionThreadUpdateManyArgs>(args: SelectSubset<T, EventDiscussionThreadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventDiscussionThreads and returns the data updated in the database.
     * @param {EventDiscussionThreadUpdateManyAndReturnArgs} args - Arguments to update many EventDiscussionThreads.
     * @example
     * // Update many EventDiscussionThreads
     * const eventDiscussionThread = await prisma.eventDiscussionThread.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventDiscussionThreads and only return the `id`
     * const eventDiscussionThreadWithIdOnly = await prisma.eventDiscussionThread.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventDiscussionThreadUpdateManyAndReturnArgs>(args: SelectSubset<T, EventDiscussionThreadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventDiscussionThread.
     * @param {EventDiscussionThreadUpsertArgs} args - Arguments to update or create a EventDiscussionThread.
     * @example
     * // Update or create a EventDiscussionThread
     * const eventDiscussionThread = await prisma.eventDiscussionThread.upsert({
     *   create: {
     *     // ... data to create a EventDiscussionThread
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventDiscussionThread we want to update
     *   }
     * })
     */
    upsert<T extends EventDiscussionThreadUpsertArgs>(args: SelectSubset<T, EventDiscussionThreadUpsertArgs<ExtArgs>>): Prisma__EventDiscussionThreadClient<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventDiscussionThreads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionThreadCountArgs} args - Arguments to filter EventDiscussionThreads to count.
     * @example
     * // Count the number of EventDiscussionThreads
     * const count = await prisma.eventDiscussionThread.count({
     *   where: {
     *     // ... the filter for the EventDiscussionThreads we want to count
     *   }
     * })
    **/
    count<T extends EventDiscussionThreadCountArgs>(
      args?: Subset<T, EventDiscussionThreadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventDiscussionThreadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventDiscussionThread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionThreadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventDiscussionThreadAggregateArgs>(args: Subset<T, EventDiscussionThreadAggregateArgs>): Prisma.PrismaPromise<GetEventDiscussionThreadAggregateType<T>>

    /**
     * Group by EventDiscussionThread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionThreadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventDiscussionThreadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventDiscussionThreadGroupByArgs['orderBy'] }
        : { orderBy?: EventDiscussionThreadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventDiscussionThreadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventDiscussionThreadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventDiscussionThread model
   */
  readonly fields: EventDiscussionThreadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventDiscussionThread.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventDiscussionThreadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    replies<T extends EventDiscussionThread$repliesArgs<ExtArgs> = {}>(args?: Subset<T, EventDiscussionThread$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EventDiscussionThread model
   */
  interface EventDiscussionThreadFieldRefs {
    readonly id: FieldRef<"EventDiscussionThread", 'Int'>
    readonly eventId: FieldRef<"EventDiscussionThread", 'Int'>
    readonly authorId: FieldRef<"EventDiscussionThread", 'String'>
    readonly question: FieldRef<"EventDiscussionThread", 'String'>
    readonly pinned: FieldRef<"EventDiscussionThread", 'Boolean'>
    readonly createdAt: FieldRef<"EventDiscussionThread", 'DateTime'>
    readonly updatedAt: FieldRef<"EventDiscussionThread", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventDiscussionThread findUnique
   */
  export type EventDiscussionThreadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadInclude<ExtArgs> | null
    /**
     * Filter, which EventDiscussionThread to fetch.
     */
    where: EventDiscussionThreadWhereUniqueInput
  }

  /**
   * EventDiscussionThread findUniqueOrThrow
   */
  export type EventDiscussionThreadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadInclude<ExtArgs> | null
    /**
     * Filter, which EventDiscussionThread to fetch.
     */
    where: EventDiscussionThreadWhereUniqueInput
  }

  /**
   * EventDiscussionThread findFirst
   */
  export type EventDiscussionThreadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadInclude<ExtArgs> | null
    /**
     * Filter, which EventDiscussionThread to fetch.
     */
    where?: EventDiscussionThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDiscussionThreads to fetch.
     */
    orderBy?: EventDiscussionThreadOrderByWithRelationInput | EventDiscussionThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventDiscussionThreads.
     */
    cursor?: EventDiscussionThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDiscussionThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDiscussionThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventDiscussionThreads.
     */
    distinct?: EventDiscussionThreadScalarFieldEnum | EventDiscussionThreadScalarFieldEnum[]
  }

  /**
   * EventDiscussionThread findFirstOrThrow
   */
  export type EventDiscussionThreadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadInclude<ExtArgs> | null
    /**
     * Filter, which EventDiscussionThread to fetch.
     */
    where?: EventDiscussionThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDiscussionThreads to fetch.
     */
    orderBy?: EventDiscussionThreadOrderByWithRelationInput | EventDiscussionThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventDiscussionThreads.
     */
    cursor?: EventDiscussionThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDiscussionThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDiscussionThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventDiscussionThreads.
     */
    distinct?: EventDiscussionThreadScalarFieldEnum | EventDiscussionThreadScalarFieldEnum[]
  }

  /**
   * EventDiscussionThread findMany
   */
  export type EventDiscussionThreadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadInclude<ExtArgs> | null
    /**
     * Filter, which EventDiscussionThreads to fetch.
     */
    where?: EventDiscussionThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDiscussionThreads to fetch.
     */
    orderBy?: EventDiscussionThreadOrderByWithRelationInput | EventDiscussionThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventDiscussionThreads.
     */
    cursor?: EventDiscussionThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDiscussionThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDiscussionThreads.
     */
    skip?: number
    distinct?: EventDiscussionThreadScalarFieldEnum | EventDiscussionThreadScalarFieldEnum[]
  }

  /**
   * EventDiscussionThread create
   */
  export type EventDiscussionThreadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadInclude<ExtArgs> | null
    /**
     * The data needed to create a EventDiscussionThread.
     */
    data: XOR<EventDiscussionThreadCreateInput, EventDiscussionThreadUncheckedCreateInput>
  }

  /**
   * EventDiscussionThread createMany
   */
  export type EventDiscussionThreadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventDiscussionThreads.
     */
    data: EventDiscussionThreadCreateManyInput | EventDiscussionThreadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventDiscussionThread createManyAndReturn
   */
  export type EventDiscussionThreadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * The data used to create many EventDiscussionThreads.
     */
    data: EventDiscussionThreadCreateManyInput | EventDiscussionThreadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventDiscussionThread update
   */
  export type EventDiscussionThreadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadInclude<ExtArgs> | null
    /**
     * The data needed to update a EventDiscussionThread.
     */
    data: XOR<EventDiscussionThreadUpdateInput, EventDiscussionThreadUncheckedUpdateInput>
    /**
     * Choose, which EventDiscussionThread to update.
     */
    where: EventDiscussionThreadWhereUniqueInput
  }

  /**
   * EventDiscussionThread updateMany
   */
  export type EventDiscussionThreadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventDiscussionThreads.
     */
    data: XOR<EventDiscussionThreadUpdateManyMutationInput, EventDiscussionThreadUncheckedUpdateManyInput>
    /**
     * Filter which EventDiscussionThreads to update
     */
    where?: EventDiscussionThreadWhereInput
    /**
     * Limit how many EventDiscussionThreads to update.
     */
    limit?: number
  }

  /**
   * EventDiscussionThread updateManyAndReturn
   */
  export type EventDiscussionThreadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * The data used to update EventDiscussionThreads.
     */
    data: XOR<EventDiscussionThreadUpdateManyMutationInput, EventDiscussionThreadUncheckedUpdateManyInput>
    /**
     * Filter which EventDiscussionThreads to update
     */
    where?: EventDiscussionThreadWhereInput
    /**
     * Limit how many EventDiscussionThreads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventDiscussionThread upsert
   */
  export type EventDiscussionThreadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadInclude<ExtArgs> | null
    /**
     * The filter to search for the EventDiscussionThread to update in case it exists.
     */
    where: EventDiscussionThreadWhereUniqueInput
    /**
     * In case the EventDiscussionThread found by the `where` argument doesn't exist, create a new EventDiscussionThread with this data.
     */
    create: XOR<EventDiscussionThreadCreateInput, EventDiscussionThreadUncheckedCreateInput>
    /**
     * In case the EventDiscussionThread was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventDiscussionThreadUpdateInput, EventDiscussionThreadUncheckedUpdateInput>
  }

  /**
   * EventDiscussionThread delete
   */
  export type EventDiscussionThreadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadInclude<ExtArgs> | null
    /**
     * Filter which EventDiscussionThread to delete.
     */
    where: EventDiscussionThreadWhereUniqueInput
  }

  /**
   * EventDiscussionThread deleteMany
   */
  export type EventDiscussionThreadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventDiscussionThreads to delete
     */
    where?: EventDiscussionThreadWhereInput
    /**
     * Limit how many EventDiscussionThreads to delete.
     */
    limit?: number
  }

  /**
   * EventDiscussionThread.replies
   */
  export type EventDiscussionThread$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyInclude<ExtArgs> | null
    where?: EventDiscussionReplyWhereInput
    orderBy?: EventDiscussionReplyOrderByWithRelationInput | EventDiscussionReplyOrderByWithRelationInput[]
    cursor?: EventDiscussionReplyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventDiscussionReplyScalarFieldEnum | EventDiscussionReplyScalarFieldEnum[]
  }

  /**
   * EventDiscussionThread without action
   */
  export type EventDiscussionThreadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionThread
     */
    select?: EventDiscussionThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionThread
     */
    omit?: EventDiscussionThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionThreadInclude<ExtArgs> | null
  }


  /**
   * Model EventDiscussionReply
   */

  export type AggregateEventDiscussionReply = {
    _count: EventDiscussionReplyCountAggregateOutputType | null
    _avg: EventDiscussionReplyAvgAggregateOutputType | null
    _sum: EventDiscussionReplySumAggregateOutputType | null
    _min: EventDiscussionReplyMinAggregateOutputType | null
    _max: EventDiscussionReplyMaxAggregateOutputType | null
  }

  export type EventDiscussionReplyAvgAggregateOutputType = {
    id: number | null
    threadId: number | null
  }

  export type EventDiscussionReplySumAggregateOutputType = {
    id: number | null
    threadId: number | null
  }

  export type EventDiscussionReplyMinAggregateOutputType = {
    id: number | null
    threadId: number | null
    authorId: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventDiscussionReplyMaxAggregateOutputType = {
    id: number | null
    threadId: number | null
    authorId: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventDiscussionReplyCountAggregateOutputType = {
    id: number
    threadId: number
    authorId: number
    message: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventDiscussionReplyAvgAggregateInputType = {
    id?: true
    threadId?: true
  }

  export type EventDiscussionReplySumAggregateInputType = {
    id?: true
    threadId?: true
  }

  export type EventDiscussionReplyMinAggregateInputType = {
    id?: true
    threadId?: true
    authorId?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventDiscussionReplyMaxAggregateInputType = {
    id?: true
    threadId?: true
    authorId?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventDiscussionReplyCountAggregateInputType = {
    id?: true
    threadId?: true
    authorId?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventDiscussionReplyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventDiscussionReply to aggregate.
     */
    where?: EventDiscussionReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDiscussionReplies to fetch.
     */
    orderBy?: EventDiscussionReplyOrderByWithRelationInput | EventDiscussionReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventDiscussionReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDiscussionReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDiscussionReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventDiscussionReplies
    **/
    _count?: true | EventDiscussionReplyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventDiscussionReplyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventDiscussionReplySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventDiscussionReplyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventDiscussionReplyMaxAggregateInputType
  }

  export type GetEventDiscussionReplyAggregateType<T extends EventDiscussionReplyAggregateArgs> = {
        [P in keyof T & keyof AggregateEventDiscussionReply]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventDiscussionReply[P]>
      : GetScalarType<T[P], AggregateEventDiscussionReply[P]>
  }




  export type EventDiscussionReplyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDiscussionReplyWhereInput
    orderBy?: EventDiscussionReplyOrderByWithAggregationInput | EventDiscussionReplyOrderByWithAggregationInput[]
    by: EventDiscussionReplyScalarFieldEnum[] | EventDiscussionReplyScalarFieldEnum
    having?: EventDiscussionReplyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventDiscussionReplyCountAggregateInputType | true
    _avg?: EventDiscussionReplyAvgAggregateInputType
    _sum?: EventDiscussionReplySumAggregateInputType
    _min?: EventDiscussionReplyMinAggregateInputType
    _max?: EventDiscussionReplyMaxAggregateInputType
  }

  export type EventDiscussionReplyGroupByOutputType = {
    id: number
    threadId: number
    authorId: string
    message: string
    createdAt: Date
    updatedAt: Date
    _count: EventDiscussionReplyCountAggregateOutputType | null
    _avg: EventDiscussionReplyAvgAggregateOutputType | null
    _sum: EventDiscussionReplySumAggregateOutputType | null
    _min: EventDiscussionReplyMinAggregateOutputType | null
    _max: EventDiscussionReplyMaxAggregateOutputType | null
  }

  type GetEventDiscussionReplyGroupByPayload<T extends EventDiscussionReplyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventDiscussionReplyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventDiscussionReplyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventDiscussionReplyGroupByOutputType[P]>
            : GetScalarType<T[P], EventDiscussionReplyGroupByOutputType[P]>
        }
      >
    >


  export type EventDiscussionReplySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    authorId?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    thread?: boolean | EventDiscussionThreadDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDiscussionReply"]>

  export type EventDiscussionReplySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    authorId?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    thread?: boolean | EventDiscussionThreadDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDiscussionReply"]>

  export type EventDiscussionReplySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    authorId?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    thread?: boolean | EventDiscussionThreadDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDiscussionReply"]>

  export type EventDiscussionReplySelectScalar = {
    id?: boolean
    threadId?: boolean
    authorId?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventDiscussionReplyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "threadId" | "authorId" | "message" | "createdAt" | "updatedAt", ExtArgs["result"]["eventDiscussionReply"]>
  export type EventDiscussionReplyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thread?: boolean | EventDiscussionThreadDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EventDiscussionReplyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thread?: boolean | EventDiscussionThreadDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EventDiscussionReplyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thread?: boolean | EventDiscussionThreadDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EventDiscussionReplyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventDiscussionReply"
    objects: {
      thread: Prisma.$EventDiscussionThreadPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      threadId: number
      authorId: string
      message: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["eventDiscussionReply"]>
    composites: {}
  }

  type EventDiscussionReplyGetPayload<S extends boolean | null | undefined | EventDiscussionReplyDefaultArgs> = $Result.GetResult<Prisma.$EventDiscussionReplyPayload, S>

  type EventDiscussionReplyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventDiscussionReplyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventDiscussionReplyCountAggregateInputType | true
    }

  export interface EventDiscussionReplyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventDiscussionReply'], meta: { name: 'EventDiscussionReply' } }
    /**
     * Find zero or one EventDiscussionReply that matches the filter.
     * @param {EventDiscussionReplyFindUniqueArgs} args - Arguments to find a EventDiscussionReply
     * @example
     * // Get one EventDiscussionReply
     * const eventDiscussionReply = await prisma.eventDiscussionReply.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventDiscussionReplyFindUniqueArgs>(args: SelectSubset<T, EventDiscussionReplyFindUniqueArgs<ExtArgs>>): Prisma__EventDiscussionReplyClient<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventDiscussionReply that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventDiscussionReplyFindUniqueOrThrowArgs} args - Arguments to find a EventDiscussionReply
     * @example
     * // Get one EventDiscussionReply
     * const eventDiscussionReply = await prisma.eventDiscussionReply.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventDiscussionReplyFindUniqueOrThrowArgs>(args: SelectSubset<T, EventDiscussionReplyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventDiscussionReplyClient<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventDiscussionReply that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionReplyFindFirstArgs} args - Arguments to find a EventDiscussionReply
     * @example
     * // Get one EventDiscussionReply
     * const eventDiscussionReply = await prisma.eventDiscussionReply.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventDiscussionReplyFindFirstArgs>(args?: SelectSubset<T, EventDiscussionReplyFindFirstArgs<ExtArgs>>): Prisma__EventDiscussionReplyClient<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventDiscussionReply that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionReplyFindFirstOrThrowArgs} args - Arguments to find a EventDiscussionReply
     * @example
     * // Get one EventDiscussionReply
     * const eventDiscussionReply = await prisma.eventDiscussionReply.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventDiscussionReplyFindFirstOrThrowArgs>(args?: SelectSubset<T, EventDiscussionReplyFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventDiscussionReplyClient<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventDiscussionReplies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionReplyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventDiscussionReplies
     * const eventDiscussionReplies = await prisma.eventDiscussionReply.findMany()
     * 
     * // Get first 10 EventDiscussionReplies
     * const eventDiscussionReplies = await prisma.eventDiscussionReply.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventDiscussionReplyWithIdOnly = await prisma.eventDiscussionReply.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventDiscussionReplyFindManyArgs>(args?: SelectSubset<T, EventDiscussionReplyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventDiscussionReply.
     * @param {EventDiscussionReplyCreateArgs} args - Arguments to create a EventDiscussionReply.
     * @example
     * // Create one EventDiscussionReply
     * const EventDiscussionReply = await prisma.eventDiscussionReply.create({
     *   data: {
     *     // ... data to create a EventDiscussionReply
     *   }
     * })
     * 
     */
    create<T extends EventDiscussionReplyCreateArgs>(args: SelectSubset<T, EventDiscussionReplyCreateArgs<ExtArgs>>): Prisma__EventDiscussionReplyClient<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventDiscussionReplies.
     * @param {EventDiscussionReplyCreateManyArgs} args - Arguments to create many EventDiscussionReplies.
     * @example
     * // Create many EventDiscussionReplies
     * const eventDiscussionReply = await prisma.eventDiscussionReply.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventDiscussionReplyCreateManyArgs>(args?: SelectSubset<T, EventDiscussionReplyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventDiscussionReplies and returns the data saved in the database.
     * @param {EventDiscussionReplyCreateManyAndReturnArgs} args - Arguments to create many EventDiscussionReplies.
     * @example
     * // Create many EventDiscussionReplies
     * const eventDiscussionReply = await prisma.eventDiscussionReply.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventDiscussionReplies and only return the `id`
     * const eventDiscussionReplyWithIdOnly = await prisma.eventDiscussionReply.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventDiscussionReplyCreateManyAndReturnArgs>(args?: SelectSubset<T, EventDiscussionReplyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventDiscussionReply.
     * @param {EventDiscussionReplyDeleteArgs} args - Arguments to delete one EventDiscussionReply.
     * @example
     * // Delete one EventDiscussionReply
     * const EventDiscussionReply = await prisma.eventDiscussionReply.delete({
     *   where: {
     *     // ... filter to delete one EventDiscussionReply
     *   }
     * })
     * 
     */
    delete<T extends EventDiscussionReplyDeleteArgs>(args: SelectSubset<T, EventDiscussionReplyDeleteArgs<ExtArgs>>): Prisma__EventDiscussionReplyClient<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventDiscussionReply.
     * @param {EventDiscussionReplyUpdateArgs} args - Arguments to update one EventDiscussionReply.
     * @example
     * // Update one EventDiscussionReply
     * const eventDiscussionReply = await prisma.eventDiscussionReply.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventDiscussionReplyUpdateArgs>(args: SelectSubset<T, EventDiscussionReplyUpdateArgs<ExtArgs>>): Prisma__EventDiscussionReplyClient<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventDiscussionReplies.
     * @param {EventDiscussionReplyDeleteManyArgs} args - Arguments to filter EventDiscussionReplies to delete.
     * @example
     * // Delete a few EventDiscussionReplies
     * const { count } = await prisma.eventDiscussionReply.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDiscussionReplyDeleteManyArgs>(args?: SelectSubset<T, EventDiscussionReplyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventDiscussionReplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionReplyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventDiscussionReplies
     * const eventDiscussionReply = await prisma.eventDiscussionReply.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventDiscussionReplyUpdateManyArgs>(args: SelectSubset<T, EventDiscussionReplyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventDiscussionReplies and returns the data updated in the database.
     * @param {EventDiscussionReplyUpdateManyAndReturnArgs} args - Arguments to update many EventDiscussionReplies.
     * @example
     * // Update many EventDiscussionReplies
     * const eventDiscussionReply = await prisma.eventDiscussionReply.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventDiscussionReplies and only return the `id`
     * const eventDiscussionReplyWithIdOnly = await prisma.eventDiscussionReply.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventDiscussionReplyUpdateManyAndReturnArgs>(args: SelectSubset<T, EventDiscussionReplyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventDiscussionReply.
     * @param {EventDiscussionReplyUpsertArgs} args - Arguments to update or create a EventDiscussionReply.
     * @example
     * // Update or create a EventDiscussionReply
     * const eventDiscussionReply = await prisma.eventDiscussionReply.upsert({
     *   create: {
     *     // ... data to create a EventDiscussionReply
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventDiscussionReply we want to update
     *   }
     * })
     */
    upsert<T extends EventDiscussionReplyUpsertArgs>(args: SelectSubset<T, EventDiscussionReplyUpsertArgs<ExtArgs>>): Prisma__EventDiscussionReplyClient<$Result.GetResult<Prisma.$EventDiscussionReplyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventDiscussionReplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionReplyCountArgs} args - Arguments to filter EventDiscussionReplies to count.
     * @example
     * // Count the number of EventDiscussionReplies
     * const count = await prisma.eventDiscussionReply.count({
     *   where: {
     *     // ... the filter for the EventDiscussionReplies we want to count
     *   }
     * })
    **/
    count<T extends EventDiscussionReplyCountArgs>(
      args?: Subset<T, EventDiscussionReplyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventDiscussionReplyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventDiscussionReply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionReplyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventDiscussionReplyAggregateArgs>(args: Subset<T, EventDiscussionReplyAggregateArgs>): Prisma.PrismaPromise<GetEventDiscussionReplyAggregateType<T>>

    /**
     * Group by EventDiscussionReply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDiscussionReplyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventDiscussionReplyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventDiscussionReplyGroupByArgs['orderBy'] }
        : { orderBy?: EventDiscussionReplyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventDiscussionReplyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventDiscussionReplyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventDiscussionReply model
   */
  readonly fields: EventDiscussionReplyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventDiscussionReply.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventDiscussionReplyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    thread<T extends EventDiscussionThreadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDiscussionThreadDefaultArgs<ExtArgs>>): Prisma__EventDiscussionThreadClient<$Result.GetResult<Prisma.$EventDiscussionThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EventDiscussionReply model
   */
  interface EventDiscussionReplyFieldRefs {
    readonly id: FieldRef<"EventDiscussionReply", 'Int'>
    readonly threadId: FieldRef<"EventDiscussionReply", 'Int'>
    readonly authorId: FieldRef<"EventDiscussionReply", 'String'>
    readonly message: FieldRef<"EventDiscussionReply", 'String'>
    readonly createdAt: FieldRef<"EventDiscussionReply", 'DateTime'>
    readonly updatedAt: FieldRef<"EventDiscussionReply", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventDiscussionReply findUnique
   */
  export type EventDiscussionReplyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyInclude<ExtArgs> | null
    /**
     * Filter, which EventDiscussionReply to fetch.
     */
    where: EventDiscussionReplyWhereUniqueInput
  }

  /**
   * EventDiscussionReply findUniqueOrThrow
   */
  export type EventDiscussionReplyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyInclude<ExtArgs> | null
    /**
     * Filter, which EventDiscussionReply to fetch.
     */
    where: EventDiscussionReplyWhereUniqueInput
  }

  /**
   * EventDiscussionReply findFirst
   */
  export type EventDiscussionReplyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyInclude<ExtArgs> | null
    /**
     * Filter, which EventDiscussionReply to fetch.
     */
    where?: EventDiscussionReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDiscussionReplies to fetch.
     */
    orderBy?: EventDiscussionReplyOrderByWithRelationInput | EventDiscussionReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventDiscussionReplies.
     */
    cursor?: EventDiscussionReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDiscussionReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDiscussionReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventDiscussionReplies.
     */
    distinct?: EventDiscussionReplyScalarFieldEnum | EventDiscussionReplyScalarFieldEnum[]
  }

  /**
   * EventDiscussionReply findFirstOrThrow
   */
  export type EventDiscussionReplyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyInclude<ExtArgs> | null
    /**
     * Filter, which EventDiscussionReply to fetch.
     */
    where?: EventDiscussionReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDiscussionReplies to fetch.
     */
    orderBy?: EventDiscussionReplyOrderByWithRelationInput | EventDiscussionReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventDiscussionReplies.
     */
    cursor?: EventDiscussionReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDiscussionReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDiscussionReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventDiscussionReplies.
     */
    distinct?: EventDiscussionReplyScalarFieldEnum | EventDiscussionReplyScalarFieldEnum[]
  }

  /**
   * EventDiscussionReply findMany
   */
  export type EventDiscussionReplyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyInclude<ExtArgs> | null
    /**
     * Filter, which EventDiscussionReplies to fetch.
     */
    where?: EventDiscussionReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDiscussionReplies to fetch.
     */
    orderBy?: EventDiscussionReplyOrderByWithRelationInput | EventDiscussionReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventDiscussionReplies.
     */
    cursor?: EventDiscussionReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDiscussionReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDiscussionReplies.
     */
    skip?: number
    distinct?: EventDiscussionReplyScalarFieldEnum | EventDiscussionReplyScalarFieldEnum[]
  }

  /**
   * EventDiscussionReply create
   */
  export type EventDiscussionReplyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyInclude<ExtArgs> | null
    /**
     * The data needed to create a EventDiscussionReply.
     */
    data: XOR<EventDiscussionReplyCreateInput, EventDiscussionReplyUncheckedCreateInput>
  }

  /**
   * EventDiscussionReply createMany
   */
  export type EventDiscussionReplyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventDiscussionReplies.
     */
    data: EventDiscussionReplyCreateManyInput | EventDiscussionReplyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventDiscussionReply createManyAndReturn
   */
  export type EventDiscussionReplyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * The data used to create many EventDiscussionReplies.
     */
    data: EventDiscussionReplyCreateManyInput | EventDiscussionReplyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventDiscussionReply update
   */
  export type EventDiscussionReplyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyInclude<ExtArgs> | null
    /**
     * The data needed to update a EventDiscussionReply.
     */
    data: XOR<EventDiscussionReplyUpdateInput, EventDiscussionReplyUncheckedUpdateInput>
    /**
     * Choose, which EventDiscussionReply to update.
     */
    where: EventDiscussionReplyWhereUniqueInput
  }

  /**
   * EventDiscussionReply updateMany
   */
  export type EventDiscussionReplyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventDiscussionReplies.
     */
    data: XOR<EventDiscussionReplyUpdateManyMutationInput, EventDiscussionReplyUncheckedUpdateManyInput>
    /**
     * Filter which EventDiscussionReplies to update
     */
    where?: EventDiscussionReplyWhereInput
    /**
     * Limit how many EventDiscussionReplies to update.
     */
    limit?: number
  }

  /**
   * EventDiscussionReply updateManyAndReturn
   */
  export type EventDiscussionReplyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * The data used to update EventDiscussionReplies.
     */
    data: XOR<EventDiscussionReplyUpdateManyMutationInput, EventDiscussionReplyUncheckedUpdateManyInput>
    /**
     * Filter which EventDiscussionReplies to update
     */
    where?: EventDiscussionReplyWhereInput
    /**
     * Limit how many EventDiscussionReplies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventDiscussionReply upsert
   */
  export type EventDiscussionReplyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyInclude<ExtArgs> | null
    /**
     * The filter to search for the EventDiscussionReply to update in case it exists.
     */
    where: EventDiscussionReplyWhereUniqueInput
    /**
     * In case the EventDiscussionReply found by the `where` argument doesn't exist, create a new EventDiscussionReply with this data.
     */
    create: XOR<EventDiscussionReplyCreateInput, EventDiscussionReplyUncheckedCreateInput>
    /**
     * In case the EventDiscussionReply was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventDiscussionReplyUpdateInput, EventDiscussionReplyUncheckedUpdateInput>
  }

  /**
   * EventDiscussionReply delete
   */
  export type EventDiscussionReplyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyInclude<ExtArgs> | null
    /**
     * Filter which EventDiscussionReply to delete.
     */
    where: EventDiscussionReplyWhereUniqueInput
  }

  /**
   * EventDiscussionReply deleteMany
   */
  export type EventDiscussionReplyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventDiscussionReplies to delete
     */
    where?: EventDiscussionReplyWhereInput
    /**
     * Limit how many EventDiscussionReplies to delete.
     */
    limit?: number
  }

  /**
   * EventDiscussionReply without action
   */
  export type EventDiscussionReplyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDiscussionReply
     */
    select?: EventDiscussionReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDiscussionReply
     */
    omit?: EventDiscussionReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDiscussionReplyInclude<ExtArgs> | null
  }


  /**
   * Model ClubMembership
   */

  export type AggregateClubMembership = {
    _count: ClubMembershipCountAggregateOutputType | null
    _avg: ClubMembershipAvgAggregateOutputType | null
    _sum: ClubMembershipSumAggregateOutputType | null
    _min: ClubMembershipMinAggregateOutputType | null
    _max: ClubMembershipMaxAggregateOutputType | null
  }

  export type ClubMembershipAvgAggregateOutputType = {
    clubId: number | null
  }

  export type ClubMembershipSumAggregateOutputType = {
    clubId: number | null
  }

  export type ClubMembershipMinAggregateOutputType = {
    userId: string | null
    clubId: number | null
    role: $Enums.ClubRole | null
    createdAt: Date | null
  }

  export type ClubMembershipMaxAggregateOutputType = {
    userId: string | null
    clubId: number | null
    role: $Enums.ClubRole | null
    createdAt: Date | null
  }

  export type ClubMembershipCountAggregateOutputType = {
    userId: number
    clubId: number
    role: number
    createdAt: number
    _all: number
  }


  export type ClubMembershipAvgAggregateInputType = {
    clubId?: true
  }

  export type ClubMembershipSumAggregateInputType = {
    clubId?: true
  }

  export type ClubMembershipMinAggregateInputType = {
    userId?: true
    clubId?: true
    role?: true
    createdAt?: true
  }

  export type ClubMembershipMaxAggregateInputType = {
    userId?: true
    clubId?: true
    role?: true
    createdAt?: true
  }

  export type ClubMembershipCountAggregateInputType = {
    userId?: true
    clubId?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type ClubMembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClubMembership to aggregate.
     */
    where?: ClubMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClubMemberships to fetch.
     */
    orderBy?: ClubMembershipOrderByWithRelationInput | ClubMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClubMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClubMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClubMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClubMemberships
    **/
    _count?: true | ClubMembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClubMembershipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClubMembershipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClubMembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClubMembershipMaxAggregateInputType
  }

  export type GetClubMembershipAggregateType<T extends ClubMembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateClubMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClubMembership[P]>
      : GetScalarType<T[P], AggregateClubMembership[P]>
  }




  export type ClubMembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClubMembershipWhereInput
    orderBy?: ClubMembershipOrderByWithAggregationInput | ClubMembershipOrderByWithAggregationInput[]
    by: ClubMembershipScalarFieldEnum[] | ClubMembershipScalarFieldEnum
    having?: ClubMembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClubMembershipCountAggregateInputType | true
    _avg?: ClubMembershipAvgAggregateInputType
    _sum?: ClubMembershipSumAggregateInputType
    _min?: ClubMembershipMinAggregateInputType
    _max?: ClubMembershipMaxAggregateInputType
  }

  export type ClubMembershipGroupByOutputType = {
    userId: string
    clubId: number
    role: $Enums.ClubRole
    createdAt: Date
    _count: ClubMembershipCountAggregateOutputType | null
    _avg: ClubMembershipAvgAggregateOutputType | null
    _sum: ClubMembershipSumAggregateOutputType | null
    _min: ClubMembershipMinAggregateOutputType | null
    _max: ClubMembershipMaxAggregateOutputType | null
  }

  type GetClubMembershipGroupByPayload<T extends ClubMembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClubMembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClubMembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClubMembershipGroupByOutputType[P]>
            : GetScalarType<T[P], ClubMembershipGroupByOutputType[P]>
        }
      >
    >


  export type ClubMembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    clubId?: boolean
    role?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clubMembership"]>

  export type ClubMembershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    clubId?: boolean
    role?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clubMembership"]>

  export type ClubMembershipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    clubId?: boolean
    role?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clubMembership"]>

  export type ClubMembershipSelectScalar = {
    userId?: boolean
    clubId?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type ClubMembershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "clubId" | "role" | "createdAt", ExtArgs["result"]["clubMembership"]>
  export type ClubMembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }
  export type ClubMembershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }
  export type ClubMembershipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }

  export type $ClubMembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClubMembership"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      club: Prisma.$ClubPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      clubId: number
      role: $Enums.ClubRole
      createdAt: Date
    }, ExtArgs["result"]["clubMembership"]>
    composites: {}
  }

  type ClubMembershipGetPayload<S extends boolean | null | undefined | ClubMembershipDefaultArgs> = $Result.GetResult<Prisma.$ClubMembershipPayload, S>

  type ClubMembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClubMembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClubMembershipCountAggregateInputType | true
    }

  export interface ClubMembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClubMembership'], meta: { name: 'ClubMembership' } }
    /**
     * Find zero or one ClubMembership that matches the filter.
     * @param {ClubMembershipFindUniqueArgs} args - Arguments to find a ClubMembership
     * @example
     * // Get one ClubMembership
     * const clubMembership = await prisma.clubMembership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClubMembershipFindUniqueArgs>(args: SelectSubset<T, ClubMembershipFindUniqueArgs<ExtArgs>>): Prisma__ClubMembershipClient<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClubMembership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClubMembershipFindUniqueOrThrowArgs} args - Arguments to find a ClubMembership
     * @example
     * // Get one ClubMembership
     * const clubMembership = await prisma.clubMembership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClubMembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, ClubMembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClubMembershipClient<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClubMembership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMembershipFindFirstArgs} args - Arguments to find a ClubMembership
     * @example
     * // Get one ClubMembership
     * const clubMembership = await prisma.clubMembership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClubMembershipFindFirstArgs>(args?: SelectSubset<T, ClubMembershipFindFirstArgs<ExtArgs>>): Prisma__ClubMembershipClient<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClubMembership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMembershipFindFirstOrThrowArgs} args - Arguments to find a ClubMembership
     * @example
     * // Get one ClubMembership
     * const clubMembership = await prisma.clubMembership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClubMembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, ClubMembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClubMembershipClient<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClubMemberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClubMemberships
     * const clubMemberships = await prisma.clubMembership.findMany()
     * 
     * // Get first 10 ClubMemberships
     * const clubMemberships = await prisma.clubMembership.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const clubMembershipWithUserIdOnly = await prisma.clubMembership.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends ClubMembershipFindManyArgs>(args?: SelectSubset<T, ClubMembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClubMembership.
     * @param {ClubMembershipCreateArgs} args - Arguments to create a ClubMembership.
     * @example
     * // Create one ClubMembership
     * const ClubMembership = await prisma.clubMembership.create({
     *   data: {
     *     // ... data to create a ClubMembership
     *   }
     * })
     * 
     */
    create<T extends ClubMembershipCreateArgs>(args: SelectSubset<T, ClubMembershipCreateArgs<ExtArgs>>): Prisma__ClubMembershipClient<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClubMemberships.
     * @param {ClubMembershipCreateManyArgs} args - Arguments to create many ClubMemberships.
     * @example
     * // Create many ClubMemberships
     * const clubMembership = await prisma.clubMembership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClubMembershipCreateManyArgs>(args?: SelectSubset<T, ClubMembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClubMemberships and returns the data saved in the database.
     * @param {ClubMembershipCreateManyAndReturnArgs} args - Arguments to create many ClubMemberships.
     * @example
     * // Create many ClubMemberships
     * const clubMembership = await prisma.clubMembership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClubMemberships and only return the `userId`
     * const clubMembershipWithUserIdOnly = await prisma.clubMembership.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClubMembershipCreateManyAndReturnArgs>(args?: SelectSubset<T, ClubMembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClubMembership.
     * @param {ClubMembershipDeleteArgs} args - Arguments to delete one ClubMembership.
     * @example
     * // Delete one ClubMembership
     * const ClubMembership = await prisma.clubMembership.delete({
     *   where: {
     *     // ... filter to delete one ClubMembership
     *   }
     * })
     * 
     */
    delete<T extends ClubMembershipDeleteArgs>(args: SelectSubset<T, ClubMembershipDeleteArgs<ExtArgs>>): Prisma__ClubMembershipClient<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClubMembership.
     * @param {ClubMembershipUpdateArgs} args - Arguments to update one ClubMembership.
     * @example
     * // Update one ClubMembership
     * const clubMembership = await prisma.clubMembership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClubMembershipUpdateArgs>(args: SelectSubset<T, ClubMembershipUpdateArgs<ExtArgs>>): Prisma__ClubMembershipClient<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClubMemberships.
     * @param {ClubMembershipDeleteManyArgs} args - Arguments to filter ClubMemberships to delete.
     * @example
     * // Delete a few ClubMemberships
     * const { count } = await prisma.clubMembership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClubMembershipDeleteManyArgs>(args?: SelectSubset<T, ClubMembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClubMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClubMemberships
     * const clubMembership = await prisma.clubMembership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClubMembershipUpdateManyArgs>(args: SelectSubset<T, ClubMembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClubMemberships and returns the data updated in the database.
     * @param {ClubMembershipUpdateManyAndReturnArgs} args - Arguments to update many ClubMemberships.
     * @example
     * // Update many ClubMemberships
     * const clubMembership = await prisma.clubMembership.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClubMemberships and only return the `userId`
     * const clubMembershipWithUserIdOnly = await prisma.clubMembership.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClubMembershipUpdateManyAndReturnArgs>(args: SelectSubset<T, ClubMembershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClubMembership.
     * @param {ClubMembershipUpsertArgs} args - Arguments to update or create a ClubMembership.
     * @example
     * // Update or create a ClubMembership
     * const clubMembership = await prisma.clubMembership.upsert({
     *   create: {
     *     // ... data to create a ClubMembership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClubMembership we want to update
     *   }
     * })
     */
    upsert<T extends ClubMembershipUpsertArgs>(args: SelectSubset<T, ClubMembershipUpsertArgs<ExtArgs>>): Prisma__ClubMembershipClient<$Result.GetResult<Prisma.$ClubMembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClubMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMembershipCountArgs} args - Arguments to filter ClubMemberships to count.
     * @example
     * // Count the number of ClubMemberships
     * const count = await prisma.clubMembership.count({
     *   where: {
     *     // ... the filter for the ClubMemberships we want to count
     *   }
     * })
    **/
    count<T extends ClubMembershipCountArgs>(
      args?: Subset<T, ClubMembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClubMembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClubMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClubMembershipAggregateArgs>(args: Subset<T, ClubMembershipAggregateArgs>): Prisma.PrismaPromise<GetClubMembershipAggregateType<T>>

    /**
     * Group by ClubMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubMembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClubMembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClubMembershipGroupByArgs['orderBy'] }
        : { orderBy?: ClubMembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClubMembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClubMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClubMembership model
   */
  readonly fields: ClubMembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClubMembership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClubMembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    club<T extends ClubDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClubDefaultArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClubMembership model
   */
  interface ClubMembershipFieldRefs {
    readonly userId: FieldRef<"ClubMembership", 'String'>
    readonly clubId: FieldRef<"ClubMembership", 'Int'>
    readonly role: FieldRef<"ClubMembership", 'ClubRole'>
    readonly createdAt: FieldRef<"ClubMembership", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClubMembership findUnique
   */
  export type ClubMembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipInclude<ExtArgs> | null
    /**
     * Filter, which ClubMembership to fetch.
     */
    where: ClubMembershipWhereUniqueInput
  }

  /**
   * ClubMembership findUniqueOrThrow
   */
  export type ClubMembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipInclude<ExtArgs> | null
    /**
     * Filter, which ClubMembership to fetch.
     */
    where: ClubMembershipWhereUniqueInput
  }

  /**
   * ClubMembership findFirst
   */
  export type ClubMembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipInclude<ExtArgs> | null
    /**
     * Filter, which ClubMembership to fetch.
     */
    where?: ClubMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClubMemberships to fetch.
     */
    orderBy?: ClubMembershipOrderByWithRelationInput | ClubMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClubMemberships.
     */
    cursor?: ClubMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClubMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClubMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClubMemberships.
     */
    distinct?: ClubMembershipScalarFieldEnum | ClubMembershipScalarFieldEnum[]
  }

  /**
   * ClubMembership findFirstOrThrow
   */
  export type ClubMembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipInclude<ExtArgs> | null
    /**
     * Filter, which ClubMembership to fetch.
     */
    where?: ClubMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClubMemberships to fetch.
     */
    orderBy?: ClubMembershipOrderByWithRelationInput | ClubMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClubMemberships.
     */
    cursor?: ClubMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClubMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClubMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClubMemberships.
     */
    distinct?: ClubMembershipScalarFieldEnum | ClubMembershipScalarFieldEnum[]
  }

  /**
   * ClubMembership findMany
   */
  export type ClubMembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipInclude<ExtArgs> | null
    /**
     * Filter, which ClubMemberships to fetch.
     */
    where?: ClubMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClubMemberships to fetch.
     */
    orderBy?: ClubMembershipOrderByWithRelationInput | ClubMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClubMemberships.
     */
    cursor?: ClubMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClubMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClubMemberships.
     */
    skip?: number
    distinct?: ClubMembershipScalarFieldEnum | ClubMembershipScalarFieldEnum[]
  }

  /**
   * ClubMembership create
   */
  export type ClubMembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a ClubMembership.
     */
    data: XOR<ClubMembershipCreateInput, ClubMembershipUncheckedCreateInput>
  }

  /**
   * ClubMembership createMany
   */
  export type ClubMembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClubMemberships.
     */
    data: ClubMembershipCreateManyInput | ClubMembershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClubMembership createManyAndReturn
   */
  export type ClubMembershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * The data used to create many ClubMemberships.
     */
    data: ClubMembershipCreateManyInput | ClubMembershipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClubMembership update
   */
  export type ClubMembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a ClubMembership.
     */
    data: XOR<ClubMembershipUpdateInput, ClubMembershipUncheckedUpdateInput>
    /**
     * Choose, which ClubMembership to update.
     */
    where: ClubMembershipWhereUniqueInput
  }

  /**
   * ClubMembership updateMany
   */
  export type ClubMembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClubMemberships.
     */
    data: XOR<ClubMembershipUpdateManyMutationInput, ClubMembershipUncheckedUpdateManyInput>
    /**
     * Filter which ClubMemberships to update
     */
    where?: ClubMembershipWhereInput
    /**
     * Limit how many ClubMemberships to update.
     */
    limit?: number
  }

  /**
   * ClubMembership updateManyAndReturn
   */
  export type ClubMembershipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * The data used to update ClubMemberships.
     */
    data: XOR<ClubMembershipUpdateManyMutationInput, ClubMembershipUncheckedUpdateManyInput>
    /**
     * Filter which ClubMemberships to update
     */
    where?: ClubMembershipWhereInput
    /**
     * Limit how many ClubMemberships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClubMembership upsert
   */
  export type ClubMembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the ClubMembership to update in case it exists.
     */
    where: ClubMembershipWhereUniqueInput
    /**
     * In case the ClubMembership found by the `where` argument doesn't exist, create a new ClubMembership with this data.
     */
    create: XOR<ClubMembershipCreateInput, ClubMembershipUncheckedCreateInput>
    /**
     * In case the ClubMembership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClubMembershipUpdateInput, ClubMembershipUncheckedUpdateInput>
  }

  /**
   * ClubMembership delete
   */
  export type ClubMembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipInclude<ExtArgs> | null
    /**
     * Filter which ClubMembership to delete.
     */
    where: ClubMembershipWhereUniqueInput
  }

  /**
   * ClubMembership deleteMany
   */
  export type ClubMembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClubMemberships to delete
     */
    where?: ClubMembershipWhereInput
    /**
     * Limit how many ClubMemberships to delete.
     */
    limit?: number
  }

  /**
   * ClubMembership without action
   */
  export type ClubMembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClubMembership
     */
    select?: ClubMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClubMembership
     */
    omit?: ClubMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubMembershipInclude<ExtArgs> | null
  }


  /**
   * Model HubFollow
   */

  export type AggregateHubFollow = {
    _count: HubFollowCountAggregateOutputType | null
    _avg: HubFollowAvgAggregateOutputType | null
    _sum: HubFollowSumAggregateOutputType | null
    _min: HubFollowMinAggregateOutputType | null
    _max: HubFollowMaxAggregateOutputType | null
  }

  export type HubFollowAvgAggregateOutputType = {
    clubId: number | null
  }

  export type HubFollowSumAggregateOutputType = {
    clubId: number | null
  }

  export type HubFollowMinAggregateOutputType = {
    userId: string | null
    clubId: number | null
    createdAt: Date | null
  }

  export type HubFollowMaxAggregateOutputType = {
    userId: string | null
    clubId: number | null
    createdAt: Date | null
  }

  export type HubFollowCountAggregateOutputType = {
    userId: number
    clubId: number
    createdAt: number
    _all: number
  }


  export type HubFollowAvgAggregateInputType = {
    clubId?: true
  }

  export type HubFollowSumAggregateInputType = {
    clubId?: true
  }

  export type HubFollowMinAggregateInputType = {
    userId?: true
    clubId?: true
    createdAt?: true
  }

  export type HubFollowMaxAggregateInputType = {
    userId?: true
    clubId?: true
    createdAt?: true
  }

  export type HubFollowCountAggregateInputType = {
    userId?: true
    clubId?: true
    createdAt?: true
    _all?: true
  }

  export type HubFollowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HubFollow to aggregate.
     */
    where?: HubFollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HubFollows to fetch.
     */
    orderBy?: HubFollowOrderByWithRelationInput | HubFollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HubFollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HubFollows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HubFollows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HubFollows
    **/
    _count?: true | HubFollowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HubFollowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HubFollowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HubFollowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HubFollowMaxAggregateInputType
  }

  export type GetHubFollowAggregateType<T extends HubFollowAggregateArgs> = {
        [P in keyof T & keyof AggregateHubFollow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHubFollow[P]>
      : GetScalarType<T[P], AggregateHubFollow[P]>
  }




  export type HubFollowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HubFollowWhereInput
    orderBy?: HubFollowOrderByWithAggregationInput | HubFollowOrderByWithAggregationInput[]
    by: HubFollowScalarFieldEnum[] | HubFollowScalarFieldEnum
    having?: HubFollowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HubFollowCountAggregateInputType | true
    _avg?: HubFollowAvgAggregateInputType
    _sum?: HubFollowSumAggregateInputType
    _min?: HubFollowMinAggregateInputType
    _max?: HubFollowMaxAggregateInputType
  }

  export type HubFollowGroupByOutputType = {
    userId: string
    clubId: number
    createdAt: Date
    _count: HubFollowCountAggregateOutputType | null
    _avg: HubFollowAvgAggregateOutputType | null
    _sum: HubFollowSumAggregateOutputType | null
    _min: HubFollowMinAggregateOutputType | null
    _max: HubFollowMaxAggregateOutputType | null
  }

  type GetHubFollowGroupByPayload<T extends HubFollowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HubFollowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HubFollowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HubFollowGroupByOutputType[P]>
            : GetScalarType<T[P], HubFollowGroupByOutputType[P]>
        }
      >
    >


  export type HubFollowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    clubId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hubFollow"]>

  export type HubFollowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    clubId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hubFollow"]>

  export type HubFollowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    clubId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hubFollow"]>

  export type HubFollowSelectScalar = {
    userId?: boolean
    clubId?: boolean
    createdAt?: boolean
  }

  export type HubFollowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "clubId" | "createdAt", ExtArgs["result"]["hubFollow"]>
  export type HubFollowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }
  export type HubFollowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }
  export type HubFollowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }

  export type $HubFollowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HubFollow"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      club: Prisma.$ClubPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      clubId: number
      createdAt: Date
    }, ExtArgs["result"]["hubFollow"]>
    composites: {}
  }

  type HubFollowGetPayload<S extends boolean | null | undefined | HubFollowDefaultArgs> = $Result.GetResult<Prisma.$HubFollowPayload, S>

  type HubFollowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HubFollowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HubFollowCountAggregateInputType | true
    }

  export interface HubFollowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HubFollow'], meta: { name: 'HubFollow' } }
    /**
     * Find zero or one HubFollow that matches the filter.
     * @param {HubFollowFindUniqueArgs} args - Arguments to find a HubFollow
     * @example
     * // Get one HubFollow
     * const hubFollow = await prisma.hubFollow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HubFollowFindUniqueArgs>(args: SelectSubset<T, HubFollowFindUniqueArgs<ExtArgs>>): Prisma__HubFollowClient<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HubFollow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HubFollowFindUniqueOrThrowArgs} args - Arguments to find a HubFollow
     * @example
     * // Get one HubFollow
     * const hubFollow = await prisma.hubFollow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HubFollowFindUniqueOrThrowArgs>(args: SelectSubset<T, HubFollowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HubFollowClient<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HubFollow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubFollowFindFirstArgs} args - Arguments to find a HubFollow
     * @example
     * // Get one HubFollow
     * const hubFollow = await prisma.hubFollow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HubFollowFindFirstArgs>(args?: SelectSubset<T, HubFollowFindFirstArgs<ExtArgs>>): Prisma__HubFollowClient<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HubFollow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubFollowFindFirstOrThrowArgs} args - Arguments to find a HubFollow
     * @example
     * // Get one HubFollow
     * const hubFollow = await prisma.hubFollow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HubFollowFindFirstOrThrowArgs>(args?: SelectSubset<T, HubFollowFindFirstOrThrowArgs<ExtArgs>>): Prisma__HubFollowClient<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HubFollows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubFollowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HubFollows
     * const hubFollows = await prisma.hubFollow.findMany()
     * 
     * // Get first 10 HubFollows
     * const hubFollows = await prisma.hubFollow.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const hubFollowWithUserIdOnly = await prisma.hubFollow.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends HubFollowFindManyArgs>(args?: SelectSubset<T, HubFollowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HubFollow.
     * @param {HubFollowCreateArgs} args - Arguments to create a HubFollow.
     * @example
     * // Create one HubFollow
     * const HubFollow = await prisma.hubFollow.create({
     *   data: {
     *     // ... data to create a HubFollow
     *   }
     * })
     * 
     */
    create<T extends HubFollowCreateArgs>(args: SelectSubset<T, HubFollowCreateArgs<ExtArgs>>): Prisma__HubFollowClient<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HubFollows.
     * @param {HubFollowCreateManyArgs} args - Arguments to create many HubFollows.
     * @example
     * // Create many HubFollows
     * const hubFollow = await prisma.hubFollow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HubFollowCreateManyArgs>(args?: SelectSubset<T, HubFollowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HubFollows and returns the data saved in the database.
     * @param {HubFollowCreateManyAndReturnArgs} args - Arguments to create many HubFollows.
     * @example
     * // Create many HubFollows
     * const hubFollow = await prisma.hubFollow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HubFollows and only return the `userId`
     * const hubFollowWithUserIdOnly = await prisma.hubFollow.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HubFollowCreateManyAndReturnArgs>(args?: SelectSubset<T, HubFollowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HubFollow.
     * @param {HubFollowDeleteArgs} args - Arguments to delete one HubFollow.
     * @example
     * // Delete one HubFollow
     * const HubFollow = await prisma.hubFollow.delete({
     *   where: {
     *     // ... filter to delete one HubFollow
     *   }
     * })
     * 
     */
    delete<T extends HubFollowDeleteArgs>(args: SelectSubset<T, HubFollowDeleteArgs<ExtArgs>>): Prisma__HubFollowClient<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HubFollow.
     * @param {HubFollowUpdateArgs} args - Arguments to update one HubFollow.
     * @example
     * // Update one HubFollow
     * const hubFollow = await prisma.hubFollow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HubFollowUpdateArgs>(args: SelectSubset<T, HubFollowUpdateArgs<ExtArgs>>): Prisma__HubFollowClient<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HubFollows.
     * @param {HubFollowDeleteManyArgs} args - Arguments to filter HubFollows to delete.
     * @example
     * // Delete a few HubFollows
     * const { count } = await prisma.hubFollow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HubFollowDeleteManyArgs>(args?: SelectSubset<T, HubFollowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HubFollows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubFollowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HubFollows
     * const hubFollow = await prisma.hubFollow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HubFollowUpdateManyArgs>(args: SelectSubset<T, HubFollowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HubFollows and returns the data updated in the database.
     * @param {HubFollowUpdateManyAndReturnArgs} args - Arguments to update many HubFollows.
     * @example
     * // Update many HubFollows
     * const hubFollow = await prisma.hubFollow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HubFollows and only return the `userId`
     * const hubFollowWithUserIdOnly = await prisma.hubFollow.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HubFollowUpdateManyAndReturnArgs>(args: SelectSubset<T, HubFollowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HubFollow.
     * @param {HubFollowUpsertArgs} args - Arguments to update or create a HubFollow.
     * @example
     * // Update or create a HubFollow
     * const hubFollow = await prisma.hubFollow.upsert({
     *   create: {
     *     // ... data to create a HubFollow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HubFollow we want to update
     *   }
     * })
     */
    upsert<T extends HubFollowUpsertArgs>(args: SelectSubset<T, HubFollowUpsertArgs<ExtArgs>>): Prisma__HubFollowClient<$Result.GetResult<Prisma.$HubFollowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HubFollows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubFollowCountArgs} args - Arguments to filter HubFollows to count.
     * @example
     * // Count the number of HubFollows
     * const count = await prisma.hubFollow.count({
     *   where: {
     *     // ... the filter for the HubFollows we want to count
     *   }
     * })
    **/
    count<T extends HubFollowCountArgs>(
      args?: Subset<T, HubFollowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HubFollowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HubFollow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubFollowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HubFollowAggregateArgs>(args: Subset<T, HubFollowAggregateArgs>): Prisma.PrismaPromise<GetHubFollowAggregateType<T>>

    /**
     * Group by HubFollow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubFollowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HubFollowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HubFollowGroupByArgs['orderBy'] }
        : { orderBy?: HubFollowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HubFollowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHubFollowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HubFollow model
   */
  readonly fields: HubFollowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HubFollow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HubFollowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    club<T extends ClubDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClubDefaultArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HubFollow model
   */
  interface HubFollowFieldRefs {
    readonly userId: FieldRef<"HubFollow", 'String'>
    readonly clubId: FieldRef<"HubFollow", 'Int'>
    readonly createdAt: FieldRef<"HubFollow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HubFollow findUnique
   */
  export type HubFollowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowInclude<ExtArgs> | null
    /**
     * Filter, which HubFollow to fetch.
     */
    where: HubFollowWhereUniqueInput
  }

  /**
   * HubFollow findUniqueOrThrow
   */
  export type HubFollowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowInclude<ExtArgs> | null
    /**
     * Filter, which HubFollow to fetch.
     */
    where: HubFollowWhereUniqueInput
  }

  /**
   * HubFollow findFirst
   */
  export type HubFollowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowInclude<ExtArgs> | null
    /**
     * Filter, which HubFollow to fetch.
     */
    where?: HubFollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HubFollows to fetch.
     */
    orderBy?: HubFollowOrderByWithRelationInput | HubFollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HubFollows.
     */
    cursor?: HubFollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HubFollows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HubFollows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HubFollows.
     */
    distinct?: HubFollowScalarFieldEnum | HubFollowScalarFieldEnum[]
  }

  /**
   * HubFollow findFirstOrThrow
   */
  export type HubFollowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowInclude<ExtArgs> | null
    /**
     * Filter, which HubFollow to fetch.
     */
    where?: HubFollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HubFollows to fetch.
     */
    orderBy?: HubFollowOrderByWithRelationInput | HubFollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HubFollows.
     */
    cursor?: HubFollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HubFollows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HubFollows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HubFollows.
     */
    distinct?: HubFollowScalarFieldEnum | HubFollowScalarFieldEnum[]
  }

  /**
   * HubFollow findMany
   */
  export type HubFollowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowInclude<ExtArgs> | null
    /**
     * Filter, which HubFollows to fetch.
     */
    where?: HubFollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HubFollows to fetch.
     */
    orderBy?: HubFollowOrderByWithRelationInput | HubFollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HubFollows.
     */
    cursor?: HubFollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HubFollows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HubFollows.
     */
    skip?: number
    distinct?: HubFollowScalarFieldEnum | HubFollowScalarFieldEnum[]
  }

  /**
   * HubFollow create
   */
  export type HubFollowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowInclude<ExtArgs> | null
    /**
     * The data needed to create a HubFollow.
     */
    data: XOR<HubFollowCreateInput, HubFollowUncheckedCreateInput>
  }

  /**
   * HubFollow createMany
   */
  export type HubFollowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HubFollows.
     */
    data: HubFollowCreateManyInput | HubFollowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HubFollow createManyAndReturn
   */
  export type HubFollowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * The data used to create many HubFollows.
     */
    data: HubFollowCreateManyInput | HubFollowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HubFollow update
   */
  export type HubFollowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowInclude<ExtArgs> | null
    /**
     * The data needed to update a HubFollow.
     */
    data: XOR<HubFollowUpdateInput, HubFollowUncheckedUpdateInput>
    /**
     * Choose, which HubFollow to update.
     */
    where: HubFollowWhereUniqueInput
  }

  /**
   * HubFollow updateMany
   */
  export type HubFollowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HubFollows.
     */
    data: XOR<HubFollowUpdateManyMutationInput, HubFollowUncheckedUpdateManyInput>
    /**
     * Filter which HubFollows to update
     */
    where?: HubFollowWhereInput
    /**
     * Limit how many HubFollows to update.
     */
    limit?: number
  }

  /**
   * HubFollow updateManyAndReturn
   */
  export type HubFollowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * The data used to update HubFollows.
     */
    data: XOR<HubFollowUpdateManyMutationInput, HubFollowUncheckedUpdateManyInput>
    /**
     * Filter which HubFollows to update
     */
    where?: HubFollowWhereInput
    /**
     * Limit how many HubFollows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HubFollow upsert
   */
  export type HubFollowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowInclude<ExtArgs> | null
    /**
     * The filter to search for the HubFollow to update in case it exists.
     */
    where: HubFollowWhereUniqueInput
    /**
     * In case the HubFollow found by the `where` argument doesn't exist, create a new HubFollow with this data.
     */
    create: XOR<HubFollowCreateInput, HubFollowUncheckedCreateInput>
    /**
     * In case the HubFollow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HubFollowUpdateInput, HubFollowUncheckedUpdateInput>
  }

  /**
   * HubFollow delete
   */
  export type HubFollowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowInclude<ExtArgs> | null
    /**
     * Filter which HubFollow to delete.
     */
    where: HubFollowWhereUniqueInput
  }

  /**
   * HubFollow deleteMany
   */
  export type HubFollowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HubFollows to delete
     */
    where?: HubFollowWhereInput
    /**
     * Limit how many HubFollows to delete.
     */
    limit?: number
  }

  /**
   * HubFollow without action
   */
  export type HubFollowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubFollow
     */
    select?: HubFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubFollow
     */
    omit?: HubFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubFollowInclude<ExtArgs> | null
  }


  /**
   * Model HubBlock
   */

  export type AggregateHubBlock = {
    _count: HubBlockCountAggregateOutputType | null
    _avg: HubBlockAvgAggregateOutputType | null
    _sum: HubBlockSumAggregateOutputType | null
    _min: HubBlockMinAggregateOutputType | null
    _max: HubBlockMaxAggregateOutputType | null
  }

  export type HubBlockAvgAggregateOutputType = {
    id: number | null
    clubId: number | null
    position: number | null
  }

  export type HubBlockSumAggregateOutputType = {
    id: number | null
    clubId: number | null
    position: number | null
  }

  export type HubBlockMinAggregateOutputType = {
    id: number | null
    clubId: number | null
    type: $Enums.HubBlockType | null
    title: string | null
    content: string | null
    linkUrl: string | null
    position: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HubBlockMaxAggregateOutputType = {
    id: number | null
    clubId: number | null
    type: $Enums.HubBlockType | null
    title: string | null
    content: string | null
    linkUrl: string | null
    position: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HubBlockCountAggregateOutputType = {
    id: number
    clubId: number
    type: number
    title: number
    content: number
    linkUrl: number
    position: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HubBlockAvgAggregateInputType = {
    id?: true
    clubId?: true
    position?: true
  }

  export type HubBlockSumAggregateInputType = {
    id?: true
    clubId?: true
    position?: true
  }

  export type HubBlockMinAggregateInputType = {
    id?: true
    clubId?: true
    type?: true
    title?: true
    content?: true
    linkUrl?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HubBlockMaxAggregateInputType = {
    id?: true
    clubId?: true
    type?: true
    title?: true
    content?: true
    linkUrl?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HubBlockCountAggregateInputType = {
    id?: true
    clubId?: true
    type?: true
    title?: true
    content?: true
    linkUrl?: true
    position?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HubBlockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HubBlock to aggregate.
     */
    where?: HubBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HubBlocks to fetch.
     */
    orderBy?: HubBlockOrderByWithRelationInput | HubBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HubBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HubBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HubBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HubBlocks
    **/
    _count?: true | HubBlockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HubBlockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HubBlockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HubBlockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HubBlockMaxAggregateInputType
  }

  export type GetHubBlockAggregateType<T extends HubBlockAggregateArgs> = {
        [P in keyof T & keyof AggregateHubBlock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHubBlock[P]>
      : GetScalarType<T[P], AggregateHubBlock[P]>
  }




  export type HubBlockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HubBlockWhereInput
    orderBy?: HubBlockOrderByWithAggregationInput | HubBlockOrderByWithAggregationInput[]
    by: HubBlockScalarFieldEnum[] | HubBlockScalarFieldEnum
    having?: HubBlockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HubBlockCountAggregateInputType | true
    _avg?: HubBlockAvgAggregateInputType
    _sum?: HubBlockSumAggregateInputType
    _min?: HubBlockMinAggregateInputType
    _max?: HubBlockMaxAggregateInputType
  }

  export type HubBlockGroupByOutputType = {
    id: number
    clubId: number
    type: $Enums.HubBlockType
    title: string | null
    content: string
    linkUrl: string | null
    position: number
    createdAt: Date
    updatedAt: Date
    _count: HubBlockCountAggregateOutputType | null
    _avg: HubBlockAvgAggregateOutputType | null
    _sum: HubBlockSumAggregateOutputType | null
    _min: HubBlockMinAggregateOutputType | null
    _max: HubBlockMaxAggregateOutputType | null
  }

  type GetHubBlockGroupByPayload<T extends HubBlockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HubBlockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HubBlockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HubBlockGroupByOutputType[P]>
            : GetScalarType<T[P], HubBlockGroupByOutputType[P]>
        }
      >
    >


  export type HubBlockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clubId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    linkUrl?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hubBlock"]>

  export type HubBlockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clubId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    linkUrl?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hubBlock"]>

  export type HubBlockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clubId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    linkUrl?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hubBlock"]>

  export type HubBlockSelectScalar = {
    id?: boolean
    clubId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    linkUrl?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HubBlockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clubId" | "type" | "title" | "content" | "linkUrl" | "position" | "createdAt" | "updatedAt", ExtArgs["result"]["hubBlock"]>
  export type HubBlockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }
  export type HubBlockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }
  export type HubBlockIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    club?: boolean | ClubDefaultArgs<ExtArgs>
  }

  export type $HubBlockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HubBlock"
    objects: {
      club: Prisma.$ClubPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      clubId: number
      type: $Enums.HubBlockType
      title: string | null
      content: string
      linkUrl: string | null
      position: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["hubBlock"]>
    composites: {}
  }

  type HubBlockGetPayload<S extends boolean | null | undefined | HubBlockDefaultArgs> = $Result.GetResult<Prisma.$HubBlockPayload, S>

  type HubBlockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HubBlockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HubBlockCountAggregateInputType | true
    }

  export interface HubBlockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HubBlock'], meta: { name: 'HubBlock' } }
    /**
     * Find zero or one HubBlock that matches the filter.
     * @param {HubBlockFindUniqueArgs} args - Arguments to find a HubBlock
     * @example
     * // Get one HubBlock
     * const hubBlock = await prisma.hubBlock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HubBlockFindUniqueArgs>(args: SelectSubset<T, HubBlockFindUniqueArgs<ExtArgs>>): Prisma__HubBlockClient<$Result.GetResult<Prisma.$HubBlockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HubBlock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HubBlockFindUniqueOrThrowArgs} args - Arguments to find a HubBlock
     * @example
     * // Get one HubBlock
     * const hubBlock = await prisma.hubBlock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HubBlockFindUniqueOrThrowArgs>(args: SelectSubset<T, HubBlockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HubBlockClient<$Result.GetResult<Prisma.$HubBlockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HubBlock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubBlockFindFirstArgs} args - Arguments to find a HubBlock
     * @example
     * // Get one HubBlock
     * const hubBlock = await prisma.hubBlock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HubBlockFindFirstArgs>(args?: SelectSubset<T, HubBlockFindFirstArgs<ExtArgs>>): Prisma__HubBlockClient<$Result.GetResult<Prisma.$HubBlockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HubBlock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubBlockFindFirstOrThrowArgs} args - Arguments to find a HubBlock
     * @example
     * // Get one HubBlock
     * const hubBlock = await prisma.hubBlock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HubBlockFindFirstOrThrowArgs>(args?: SelectSubset<T, HubBlockFindFirstOrThrowArgs<ExtArgs>>): Prisma__HubBlockClient<$Result.GetResult<Prisma.$HubBlockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HubBlocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubBlockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HubBlocks
     * const hubBlocks = await prisma.hubBlock.findMany()
     * 
     * // Get first 10 HubBlocks
     * const hubBlocks = await prisma.hubBlock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hubBlockWithIdOnly = await prisma.hubBlock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HubBlockFindManyArgs>(args?: SelectSubset<T, HubBlockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HubBlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HubBlock.
     * @param {HubBlockCreateArgs} args - Arguments to create a HubBlock.
     * @example
     * // Create one HubBlock
     * const HubBlock = await prisma.hubBlock.create({
     *   data: {
     *     // ... data to create a HubBlock
     *   }
     * })
     * 
     */
    create<T extends HubBlockCreateArgs>(args: SelectSubset<T, HubBlockCreateArgs<ExtArgs>>): Prisma__HubBlockClient<$Result.GetResult<Prisma.$HubBlockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HubBlocks.
     * @param {HubBlockCreateManyArgs} args - Arguments to create many HubBlocks.
     * @example
     * // Create many HubBlocks
     * const hubBlock = await prisma.hubBlock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HubBlockCreateManyArgs>(args?: SelectSubset<T, HubBlockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HubBlocks and returns the data saved in the database.
     * @param {HubBlockCreateManyAndReturnArgs} args - Arguments to create many HubBlocks.
     * @example
     * // Create many HubBlocks
     * const hubBlock = await prisma.hubBlock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HubBlocks and only return the `id`
     * const hubBlockWithIdOnly = await prisma.hubBlock.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HubBlockCreateManyAndReturnArgs>(args?: SelectSubset<T, HubBlockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HubBlockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HubBlock.
     * @param {HubBlockDeleteArgs} args - Arguments to delete one HubBlock.
     * @example
     * // Delete one HubBlock
     * const HubBlock = await prisma.hubBlock.delete({
     *   where: {
     *     // ... filter to delete one HubBlock
     *   }
     * })
     * 
     */
    delete<T extends HubBlockDeleteArgs>(args: SelectSubset<T, HubBlockDeleteArgs<ExtArgs>>): Prisma__HubBlockClient<$Result.GetResult<Prisma.$HubBlockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HubBlock.
     * @param {HubBlockUpdateArgs} args - Arguments to update one HubBlock.
     * @example
     * // Update one HubBlock
     * const hubBlock = await prisma.hubBlock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HubBlockUpdateArgs>(args: SelectSubset<T, HubBlockUpdateArgs<ExtArgs>>): Prisma__HubBlockClient<$Result.GetResult<Prisma.$HubBlockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HubBlocks.
     * @param {HubBlockDeleteManyArgs} args - Arguments to filter HubBlocks to delete.
     * @example
     * // Delete a few HubBlocks
     * const { count } = await prisma.hubBlock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HubBlockDeleteManyArgs>(args?: SelectSubset<T, HubBlockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HubBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubBlockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HubBlocks
     * const hubBlock = await prisma.hubBlock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HubBlockUpdateManyArgs>(args: SelectSubset<T, HubBlockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HubBlocks and returns the data updated in the database.
     * @param {HubBlockUpdateManyAndReturnArgs} args - Arguments to update many HubBlocks.
     * @example
     * // Update many HubBlocks
     * const hubBlock = await prisma.hubBlock.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HubBlocks and only return the `id`
     * const hubBlockWithIdOnly = await prisma.hubBlock.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HubBlockUpdateManyAndReturnArgs>(args: SelectSubset<T, HubBlockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HubBlockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HubBlock.
     * @param {HubBlockUpsertArgs} args - Arguments to update or create a HubBlock.
     * @example
     * // Update or create a HubBlock
     * const hubBlock = await prisma.hubBlock.upsert({
     *   create: {
     *     // ... data to create a HubBlock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HubBlock we want to update
     *   }
     * })
     */
    upsert<T extends HubBlockUpsertArgs>(args: SelectSubset<T, HubBlockUpsertArgs<ExtArgs>>): Prisma__HubBlockClient<$Result.GetResult<Prisma.$HubBlockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HubBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubBlockCountArgs} args - Arguments to filter HubBlocks to count.
     * @example
     * // Count the number of HubBlocks
     * const count = await prisma.hubBlock.count({
     *   where: {
     *     // ... the filter for the HubBlocks we want to count
     *   }
     * })
    **/
    count<T extends HubBlockCountArgs>(
      args?: Subset<T, HubBlockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HubBlockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HubBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubBlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HubBlockAggregateArgs>(args: Subset<T, HubBlockAggregateArgs>): Prisma.PrismaPromise<GetHubBlockAggregateType<T>>

    /**
     * Group by HubBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HubBlockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HubBlockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HubBlockGroupByArgs['orderBy'] }
        : { orderBy?: HubBlockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HubBlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHubBlockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HubBlock model
   */
  readonly fields: HubBlockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HubBlock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HubBlockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    club<T extends ClubDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClubDefaultArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HubBlock model
   */
  interface HubBlockFieldRefs {
    readonly id: FieldRef<"HubBlock", 'Int'>
    readonly clubId: FieldRef<"HubBlock", 'Int'>
    readonly type: FieldRef<"HubBlock", 'HubBlockType'>
    readonly title: FieldRef<"HubBlock", 'String'>
    readonly content: FieldRef<"HubBlock", 'String'>
    readonly linkUrl: FieldRef<"HubBlock", 'String'>
    readonly position: FieldRef<"HubBlock", 'Int'>
    readonly createdAt: FieldRef<"HubBlock", 'DateTime'>
    readonly updatedAt: FieldRef<"HubBlock", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HubBlock findUnique
   */
  export type HubBlockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockInclude<ExtArgs> | null
    /**
     * Filter, which HubBlock to fetch.
     */
    where: HubBlockWhereUniqueInput
  }

  /**
   * HubBlock findUniqueOrThrow
   */
  export type HubBlockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockInclude<ExtArgs> | null
    /**
     * Filter, which HubBlock to fetch.
     */
    where: HubBlockWhereUniqueInput
  }

  /**
   * HubBlock findFirst
   */
  export type HubBlockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockInclude<ExtArgs> | null
    /**
     * Filter, which HubBlock to fetch.
     */
    where?: HubBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HubBlocks to fetch.
     */
    orderBy?: HubBlockOrderByWithRelationInput | HubBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HubBlocks.
     */
    cursor?: HubBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HubBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HubBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HubBlocks.
     */
    distinct?: HubBlockScalarFieldEnum | HubBlockScalarFieldEnum[]
  }

  /**
   * HubBlock findFirstOrThrow
   */
  export type HubBlockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockInclude<ExtArgs> | null
    /**
     * Filter, which HubBlock to fetch.
     */
    where?: HubBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HubBlocks to fetch.
     */
    orderBy?: HubBlockOrderByWithRelationInput | HubBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HubBlocks.
     */
    cursor?: HubBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HubBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HubBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HubBlocks.
     */
    distinct?: HubBlockScalarFieldEnum | HubBlockScalarFieldEnum[]
  }

  /**
   * HubBlock findMany
   */
  export type HubBlockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockInclude<ExtArgs> | null
    /**
     * Filter, which HubBlocks to fetch.
     */
    where?: HubBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HubBlocks to fetch.
     */
    orderBy?: HubBlockOrderByWithRelationInput | HubBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HubBlocks.
     */
    cursor?: HubBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HubBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HubBlocks.
     */
    skip?: number
    distinct?: HubBlockScalarFieldEnum | HubBlockScalarFieldEnum[]
  }

  /**
   * HubBlock create
   */
  export type HubBlockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockInclude<ExtArgs> | null
    /**
     * The data needed to create a HubBlock.
     */
    data: XOR<HubBlockCreateInput, HubBlockUncheckedCreateInput>
  }

  /**
   * HubBlock createMany
   */
  export type HubBlockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HubBlocks.
     */
    data: HubBlockCreateManyInput | HubBlockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HubBlock createManyAndReturn
   */
  export type HubBlockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * The data used to create many HubBlocks.
     */
    data: HubBlockCreateManyInput | HubBlockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HubBlock update
   */
  export type HubBlockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockInclude<ExtArgs> | null
    /**
     * The data needed to update a HubBlock.
     */
    data: XOR<HubBlockUpdateInput, HubBlockUncheckedUpdateInput>
    /**
     * Choose, which HubBlock to update.
     */
    where: HubBlockWhereUniqueInput
  }

  /**
   * HubBlock updateMany
   */
  export type HubBlockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HubBlocks.
     */
    data: XOR<HubBlockUpdateManyMutationInput, HubBlockUncheckedUpdateManyInput>
    /**
     * Filter which HubBlocks to update
     */
    where?: HubBlockWhereInput
    /**
     * Limit how many HubBlocks to update.
     */
    limit?: number
  }

  /**
   * HubBlock updateManyAndReturn
   */
  export type HubBlockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * The data used to update HubBlocks.
     */
    data: XOR<HubBlockUpdateManyMutationInput, HubBlockUncheckedUpdateManyInput>
    /**
     * Filter which HubBlocks to update
     */
    where?: HubBlockWhereInput
    /**
     * Limit how many HubBlocks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HubBlock upsert
   */
  export type HubBlockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockInclude<ExtArgs> | null
    /**
     * The filter to search for the HubBlock to update in case it exists.
     */
    where: HubBlockWhereUniqueInput
    /**
     * In case the HubBlock found by the `where` argument doesn't exist, create a new HubBlock with this data.
     */
    create: XOR<HubBlockCreateInput, HubBlockUncheckedCreateInput>
    /**
     * In case the HubBlock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HubBlockUpdateInput, HubBlockUncheckedUpdateInput>
  }

  /**
   * HubBlock delete
   */
  export type HubBlockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockInclude<ExtArgs> | null
    /**
     * Filter which HubBlock to delete.
     */
    where: HubBlockWhereUniqueInput
  }

  /**
   * HubBlock deleteMany
   */
  export type HubBlockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HubBlocks to delete
     */
    where?: HubBlockWhereInput
    /**
     * Limit how many HubBlocks to delete.
     */
    limit?: number
  }

  /**
   * HubBlock without action
   */
  export type HubBlockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HubBlock
     */
    select?: HubBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HubBlock
     */
    omit?: HubBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HubBlockInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model RSVP
   */

  export type AggregateRSVP = {
    _count: RSVPCountAggregateOutputType | null
    _avg: RSVPAvgAggregateOutputType | null
    _sum: RSVPSumAggregateOutputType | null
    _min: RSVPMinAggregateOutputType | null
    _max: RSVPMaxAggregateOutputType | null
  }

  export type RSVPAvgAggregateOutputType = {
    id: number | null
    eventId: number | null
  }

  export type RSVPSumAggregateOutputType = {
    id: number | null
    eventId: number | null
  }

  export type RSVPMinAggregateOutputType = {
    id: number | null
    userId: string | null
    eventId: number | null
    status: string | null
    createdAt: Date | null
  }

  export type RSVPMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    eventId: number | null
    status: string | null
    createdAt: Date | null
  }

  export type RSVPCountAggregateOutputType = {
    id: number
    userId: number
    eventId: number
    status: number
    createdAt: number
    _all: number
  }


  export type RSVPAvgAggregateInputType = {
    id?: true
    eventId?: true
  }

  export type RSVPSumAggregateInputType = {
    id?: true
    eventId?: true
  }

  export type RSVPMinAggregateInputType = {
    id?: true
    userId?: true
    eventId?: true
    status?: true
    createdAt?: true
  }

  export type RSVPMaxAggregateInputType = {
    id?: true
    userId?: true
    eventId?: true
    status?: true
    createdAt?: true
  }

  export type RSVPCountAggregateInputType = {
    id?: true
    userId?: true
    eventId?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type RSVPAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RSVP to aggregate.
     */
    where?: RSVPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RSVPS to fetch.
     */
    orderBy?: RSVPOrderByWithRelationInput | RSVPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RSVPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RSVPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RSVPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RSVPS
    **/
    _count?: true | RSVPCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RSVPAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RSVPSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RSVPMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RSVPMaxAggregateInputType
  }

  export type GetRSVPAggregateType<T extends RSVPAggregateArgs> = {
        [P in keyof T & keyof AggregateRSVP]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRSVP[P]>
      : GetScalarType<T[P], AggregateRSVP[P]>
  }




  export type RSVPGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RSVPWhereInput
    orderBy?: RSVPOrderByWithAggregationInput | RSVPOrderByWithAggregationInput[]
    by: RSVPScalarFieldEnum[] | RSVPScalarFieldEnum
    having?: RSVPScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RSVPCountAggregateInputType | true
    _avg?: RSVPAvgAggregateInputType
    _sum?: RSVPSumAggregateInputType
    _min?: RSVPMinAggregateInputType
    _max?: RSVPMaxAggregateInputType
  }

  export type RSVPGroupByOutputType = {
    id: number
    userId: string
    eventId: number
    status: string
    createdAt: Date
    _count: RSVPCountAggregateOutputType | null
    _avg: RSVPAvgAggregateOutputType | null
    _sum: RSVPSumAggregateOutputType | null
    _min: RSVPMinAggregateOutputType | null
    _max: RSVPMaxAggregateOutputType | null
  }

  type GetRSVPGroupByPayload<T extends RSVPGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RSVPGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RSVPGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RSVPGroupByOutputType[P]>
            : GetScalarType<T[P], RSVPGroupByOutputType[P]>
        }
      >
    >


  export type RSVPSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventId?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rSVP"]>

  export type RSVPSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventId?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rSVP"]>

  export type RSVPSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventId?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rSVP"]>

  export type RSVPSelectScalar = {
    id?: boolean
    userId?: boolean
    eventId?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type RSVPOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "eventId" | "status" | "createdAt", ExtArgs["result"]["rSVP"]>
  export type RSVPInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type RSVPIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type RSVPIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $RSVPPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RSVP"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      eventId: number
      status: string
      createdAt: Date
    }, ExtArgs["result"]["rSVP"]>
    composites: {}
  }

  type RSVPGetPayload<S extends boolean | null | undefined | RSVPDefaultArgs> = $Result.GetResult<Prisma.$RSVPPayload, S>

  type RSVPCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RSVPFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RSVPCountAggregateInputType | true
    }

  export interface RSVPDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RSVP'], meta: { name: 'RSVP' } }
    /**
     * Find zero or one RSVP that matches the filter.
     * @param {RSVPFindUniqueArgs} args - Arguments to find a RSVP
     * @example
     * // Get one RSVP
     * const rSVP = await prisma.rSVP.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RSVPFindUniqueArgs>(args: SelectSubset<T, RSVPFindUniqueArgs<ExtArgs>>): Prisma__RSVPClient<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RSVP that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RSVPFindUniqueOrThrowArgs} args - Arguments to find a RSVP
     * @example
     * // Get one RSVP
     * const rSVP = await prisma.rSVP.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RSVPFindUniqueOrThrowArgs>(args: SelectSubset<T, RSVPFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RSVPClient<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RSVP that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RSVPFindFirstArgs} args - Arguments to find a RSVP
     * @example
     * // Get one RSVP
     * const rSVP = await prisma.rSVP.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RSVPFindFirstArgs>(args?: SelectSubset<T, RSVPFindFirstArgs<ExtArgs>>): Prisma__RSVPClient<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RSVP that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RSVPFindFirstOrThrowArgs} args - Arguments to find a RSVP
     * @example
     * // Get one RSVP
     * const rSVP = await prisma.rSVP.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RSVPFindFirstOrThrowArgs>(args?: SelectSubset<T, RSVPFindFirstOrThrowArgs<ExtArgs>>): Prisma__RSVPClient<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RSVPS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RSVPFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RSVPS
     * const rSVPS = await prisma.rSVP.findMany()
     * 
     * // Get first 10 RSVPS
     * const rSVPS = await prisma.rSVP.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rSVPWithIdOnly = await prisma.rSVP.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RSVPFindManyArgs>(args?: SelectSubset<T, RSVPFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RSVP.
     * @param {RSVPCreateArgs} args - Arguments to create a RSVP.
     * @example
     * // Create one RSVP
     * const RSVP = await prisma.rSVP.create({
     *   data: {
     *     // ... data to create a RSVP
     *   }
     * })
     * 
     */
    create<T extends RSVPCreateArgs>(args: SelectSubset<T, RSVPCreateArgs<ExtArgs>>): Prisma__RSVPClient<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RSVPS.
     * @param {RSVPCreateManyArgs} args - Arguments to create many RSVPS.
     * @example
     * // Create many RSVPS
     * const rSVP = await prisma.rSVP.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RSVPCreateManyArgs>(args?: SelectSubset<T, RSVPCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RSVPS and returns the data saved in the database.
     * @param {RSVPCreateManyAndReturnArgs} args - Arguments to create many RSVPS.
     * @example
     * // Create many RSVPS
     * const rSVP = await prisma.rSVP.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RSVPS and only return the `id`
     * const rSVPWithIdOnly = await prisma.rSVP.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RSVPCreateManyAndReturnArgs>(args?: SelectSubset<T, RSVPCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RSVP.
     * @param {RSVPDeleteArgs} args - Arguments to delete one RSVP.
     * @example
     * // Delete one RSVP
     * const RSVP = await prisma.rSVP.delete({
     *   where: {
     *     // ... filter to delete one RSVP
     *   }
     * })
     * 
     */
    delete<T extends RSVPDeleteArgs>(args: SelectSubset<T, RSVPDeleteArgs<ExtArgs>>): Prisma__RSVPClient<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RSVP.
     * @param {RSVPUpdateArgs} args - Arguments to update one RSVP.
     * @example
     * // Update one RSVP
     * const rSVP = await prisma.rSVP.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RSVPUpdateArgs>(args: SelectSubset<T, RSVPUpdateArgs<ExtArgs>>): Prisma__RSVPClient<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RSVPS.
     * @param {RSVPDeleteManyArgs} args - Arguments to filter RSVPS to delete.
     * @example
     * // Delete a few RSVPS
     * const { count } = await prisma.rSVP.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RSVPDeleteManyArgs>(args?: SelectSubset<T, RSVPDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RSVPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RSVPUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RSVPS
     * const rSVP = await prisma.rSVP.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RSVPUpdateManyArgs>(args: SelectSubset<T, RSVPUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RSVPS and returns the data updated in the database.
     * @param {RSVPUpdateManyAndReturnArgs} args - Arguments to update many RSVPS.
     * @example
     * // Update many RSVPS
     * const rSVP = await prisma.rSVP.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RSVPS and only return the `id`
     * const rSVPWithIdOnly = await prisma.rSVP.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RSVPUpdateManyAndReturnArgs>(args: SelectSubset<T, RSVPUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RSVP.
     * @param {RSVPUpsertArgs} args - Arguments to update or create a RSVP.
     * @example
     * // Update or create a RSVP
     * const rSVP = await prisma.rSVP.upsert({
     *   create: {
     *     // ... data to create a RSVP
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RSVP we want to update
     *   }
     * })
     */
    upsert<T extends RSVPUpsertArgs>(args: SelectSubset<T, RSVPUpsertArgs<ExtArgs>>): Prisma__RSVPClient<$Result.GetResult<Prisma.$RSVPPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RSVPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RSVPCountArgs} args - Arguments to filter RSVPS to count.
     * @example
     * // Count the number of RSVPS
     * const count = await prisma.rSVP.count({
     *   where: {
     *     // ... the filter for the RSVPS we want to count
     *   }
     * })
    **/
    count<T extends RSVPCountArgs>(
      args?: Subset<T, RSVPCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RSVPCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RSVP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RSVPAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RSVPAggregateArgs>(args: Subset<T, RSVPAggregateArgs>): Prisma.PrismaPromise<GetRSVPAggregateType<T>>

    /**
     * Group by RSVP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RSVPGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RSVPGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RSVPGroupByArgs['orderBy'] }
        : { orderBy?: RSVPGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RSVPGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRSVPGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RSVP model
   */
  readonly fields: RSVPFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RSVP.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RSVPClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RSVP model
   */
  interface RSVPFieldRefs {
    readonly id: FieldRef<"RSVP", 'Int'>
    readonly userId: FieldRef<"RSVP", 'String'>
    readonly eventId: FieldRef<"RSVP", 'Int'>
    readonly status: FieldRef<"RSVP", 'String'>
    readonly createdAt: FieldRef<"RSVP", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RSVP findUnique
   */
  export type RSVPFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPInclude<ExtArgs> | null
    /**
     * Filter, which RSVP to fetch.
     */
    where: RSVPWhereUniqueInput
  }

  /**
   * RSVP findUniqueOrThrow
   */
  export type RSVPFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPInclude<ExtArgs> | null
    /**
     * Filter, which RSVP to fetch.
     */
    where: RSVPWhereUniqueInput
  }

  /**
   * RSVP findFirst
   */
  export type RSVPFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPInclude<ExtArgs> | null
    /**
     * Filter, which RSVP to fetch.
     */
    where?: RSVPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RSVPS to fetch.
     */
    orderBy?: RSVPOrderByWithRelationInput | RSVPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RSVPS.
     */
    cursor?: RSVPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RSVPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RSVPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RSVPS.
     */
    distinct?: RSVPScalarFieldEnum | RSVPScalarFieldEnum[]
  }

  /**
   * RSVP findFirstOrThrow
   */
  export type RSVPFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPInclude<ExtArgs> | null
    /**
     * Filter, which RSVP to fetch.
     */
    where?: RSVPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RSVPS to fetch.
     */
    orderBy?: RSVPOrderByWithRelationInput | RSVPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RSVPS.
     */
    cursor?: RSVPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RSVPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RSVPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RSVPS.
     */
    distinct?: RSVPScalarFieldEnum | RSVPScalarFieldEnum[]
  }

  /**
   * RSVP findMany
   */
  export type RSVPFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPInclude<ExtArgs> | null
    /**
     * Filter, which RSVPS to fetch.
     */
    where?: RSVPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RSVPS to fetch.
     */
    orderBy?: RSVPOrderByWithRelationInput | RSVPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RSVPS.
     */
    cursor?: RSVPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RSVPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RSVPS.
     */
    skip?: number
    distinct?: RSVPScalarFieldEnum | RSVPScalarFieldEnum[]
  }

  /**
   * RSVP create
   */
  export type RSVPCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPInclude<ExtArgs> | null
    /**
     * The data needed to create a RSVP.
     */
    data: XOR<RSVPCreateInput, RSVPUncheckedCreateInput>
  }

  /**
   * RSVP createMany
   */
  export type RSVPCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RSVPS.
     */
    data: RSVPCreateManyInput | RSVPCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RSVP createManyAndReturn
   */
  export type RSVPCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * The data used to create many RSVPS.
     */
    data: RSVPCreateManyInput | RSVPCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RSVP update
   */
  export type RSVPUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPInclude<ExtArgs> | null
    /**
     * The data needed to update a RSVP.
     */
    data: XOR<RSVPUpdateInput, RSVPUncheckedUpdateInput>
    /**
     * Choose, which RSVP to update.
     */
    where: RSVPWhereUniqueInput
  }

  /**
   * RSVP updateMany
   */
  export type RSVPUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RSVPS.
     */
    data: XOR<RSVPUpdateManyMutationInput, RSVPUncheckedUpdateManyInput>
    /**
     * Filter which RSVPS to update
     */
    where?: RSVPWhereInput
    /**
     * Limit how many RSVPS to update.
     */
    limit?: number
  }

  /**
   * RSVP updateManyAndReturn
   */
  export type RSVPUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * The data used to update RSVPS.
     */
    data: XOR<RSVPUpdateManyMutationInput, RSVPUncheckedUpdateManyInput>
    /**
     * Filter which RSVPS to update
     */
    where?: RSVPWhereInput
    /**
     * Limit how many RSVPS to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RSVP upsert
   */
  export type RSVPUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPInclude<ExtArgs> | null
    /**
     * The filter to search for the RSVP to update in case it exists.
     */
    where: RSVPWhereUniqueInput
    /**
     * In case the RSVP found by the `where` argument doesn't exist, create a new RSVP with this data.
     */
    create: XOR<RSVPCreateInput, RSVPUncheckedCreateInput>
    /**
     * In case the RSVP was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RSVPUpdateInput, RSVPUncheckedUpdateInput>
  }

  /**
   * RSVP delete
   */
  export type RSVPDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPInclude<ExtArgs> | null
    /**
     * Filter which RSVP to delete.
     */
    where: RSVPWhereUniqueInput
  }

  /**
   * RSVP deleteMany
   */
  export type RSVPDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RSVPS to delete
     */
    where?: RSVPWhereInput
    /**
     * Limit how many RSVPS to delete.
     */
    limit?: number
  }

  /**
   * RSVP without action
   */
  export type RSVPDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RSVP
     */
    select?: RSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RSVP
     */
    omit?: RSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RSVPInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PostScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const ClubScalarFieldEnum: {
    id: 'id',
    name: 'name',
    logoUrl: 'logoUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClubScalarFieldEnum = (typeof ClubScalarFieldEnum)[keyof typeof ClubScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    date: 'date',
    capacity: 'capacity',
    location: 'location',
    imageUrl: 'imageUrl',
    clubId: 'clubId',
    authorId: 'authorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    refresh_token_expires_in: 'refresh_token_expires_in'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    role: 'role',
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    password: 'password'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EventDiscussionThreadScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    authorId: 'authorId',
    question: 'question',
    pinned: 'pinned',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventDiscussionThreadScalarFieldEnum = (typeof EventDiscussionThreadScalarFieldEnum)[keyof typeof EventDiscussionThreadScalarFieldEnum]


  export const EventDiscussionReplyScalarFieldEnum: {
    id: 'id',
    threadId: 'threadId',
    authorId: 'authorId',
    message: 'message',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventDiscussionReplyScalarFieldEnum = (typeof EventDiscussionReplyScalarFieldEnum)[keyof typeof EventDiscussionReplyScalarFieldEnum]


  export const ClubMembershipScalarFieldEnum: {
    userId: 'userId',
    clubId: 'clubId',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type ClubMembershipScalarFieldEnum = (typeof ClubMembershipScalarFieldEnum)[keyof typeof ClubMembershipScalarFieldEnum]


  export const HubFollowScalarFieldEnum: {
    userId: 'userId',
    clubId: 'clubId',
    createdAt: 'createdAt'
  };

  export type HubFollowScalarFieldEnum = (typeof HubFollowScalarFieldEnum)[keyof typeof HubFollowScalarFieldEnum]


  export const HubBlockScalarFieldEnum: {
    id: 'id',
    clubId: 'clubId',
    type: 'type',
    title: 'title',
    content: 'content',
    linkUrl: 'linkUrl',
    position: 'position',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HubBlockScalarFieldEnum = (typeof HubBlockScalarFieldEnum)[keyof typeof HubBlockScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const RSVPScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    eventId: 'eventId',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type RSVPScalarFieldEnum = (typeof RSVPScalarFieldEnum)[keyof typeof RSVPScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'EventStatus'
   */
  export type EnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus'>
    


  /**
   * Reference to a field of type 'EventStatus[]'
   */
  export type ListEnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ClubRole'
   */
  export type EnumClubRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClubRole'>
    


  /**
   * Reference to a field of type 'ClubRole[]'
   */
  export type ListEnumClubRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClubRole[]'>
    


  /**
   * Reference to a field of type 'HubBlockType'
   */
  export type EnumHubBlockTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HubBlockType'>
    


  /**
   * Reference to a field of type 'HubBlockType[]'
   */
  export type ListEnumHubBlockTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HubBlockType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: IntFilter<"Post"> | number
    name?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    createdById?: StringFilter<"Post"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    createdBy?: UserOrderByWithRelationInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    name?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    createdById?: StringFilter<"Post"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Post"> | number
    name?: StringWithAggregatesFilter<"Post"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    createdById?: StringWithAggregatesFilter<"Post"> | string
  }

  export type ClubWhereInput = {
    AND?: ClubWhereInput | ClubWhereInput[]
    OR?: ClubWhereInput[]
    NOT?: ClubWhereInput | ClubWhereInput[]
    id?: IntFilter<"Club"> | number
    name?: StringFilter<"Club"> | string
    logoUrl?: StringFilter<"Club"> | string
    createdAt?: DateTimeFilter<"Club"> | Date | string
    updatedAt?: DateTimeFilter<"Club"> | Date | string
    events?: EventListRelationFilter
    followers?: HubFollowListRelationFilter
    blocks?: HubBlockListRelationFilter
    members?: ClubMembershipListRelationFilter
  }

  export type ClubOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    events?: EventOrderByRelationAggregateInput
    followers?: HubFollowOrderByRelationAggregateInput
    blocks?: HubBlockOrderByRelationAggregateInput
    members?: ClubMembershipOrderByRelationAggregateInput
  }

  export type ClubWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClubWhereInput | ClubWhereInput[]
    OR?: ClubWhereInput[]
    NOT?: ClubWhereInput | ClubWhereInput[]
    name?: StringFilter<"Club"> | string
    logoUrl?: StringFilter<"Club"> | string
    createdAt?: DateTimeFilter<"Club"> | Date | string
    updatedAt?: DateTimeFilter<"Club"> | Date | string
    events?: EventListRelationFilter
    followers?: HubFollowListRelationFilter
    blocks?: HubBlockListRelationFilter
    members?: ClubMembershipListRelationFilter
  }, "id">

  export type ClubOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClubCountOrderByAggregateInput
    _avg?: ClubAvgOrderByAggregateInput
    _max?: ClubMaxOrderByAggregateInput
    _min?: ClubMinOrderByAggregateInput
    _sum?: ClubSumOrderByAggregateInput
  }

  export type ClubScalarWhereWithAggregatesInput = {
    AND?: ClubScalarWhereWithAggregatesInput | ClubScalarWhereWithAggregatesInput[]
    OR?: ClubScalarWhereWithAggregatesInput[]
    NOT?: ClubScalarWhereWithAggregatesInput | ClubScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Club"> | number
    name?: StringWithAggregatesFilter<"Club"> | string
    logoUrl?: StringWithAggregatesFilter<"Club"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Club"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Club"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: IntFilter<"Event"> | number
    title?: StringFilter<"Event"> | string
    description?: StringFilter<"Event"> | string
    status?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    date?: DateTimeFilter<"Event"> | Date | string
    capacity?: IntFilter<"Event"> | number
    location?: StringFilter<"Event"> | string
    imageUrl?: StringFilter<"Event"> | string
    clubId?: IntFilter<"Event"> | number
    authorId?: StringFilter<"Event"> | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
    rsvps?: RSVPListRelationFilter
    discussionThreads?: EventDiscussionThreadListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    date?: SortOrder
    capacity?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    clubId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    author?: UserOrderByWithRelationInput
    club?: ClubOrderByWithRelationInput
    rsvps?: RSVPOrderByRelationAggregateInput
    discussionThreads?: EventDiscussionThreadOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    title?: StringFilter<"Event"> | string
    description?: StringFilter<"Event"> | string
    status?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    date?: DateTimeFilter<"Event"> | Date | string
    capacity?: IntFilter<"Event"> | number
    location?: StringFilter<"Event"> | string
    imageUrl?: StringFilter<"Event"> | string
    clubId?: IntFilter<"Event"> | number
    authorId?: StringFilter<"Event"> | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
    rsvps?: RSVPListRelationFilter
    discussionThreads?: EventDiscussionThreadListRelationFilter
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    date?: SortOrder
    capacity?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    clubId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Event"> | number
    title?: StringWithAggregatesFilter<"Event"> | string
    description?: StringWithAggregatesFilter<"Event"> | string
    status?: EnumEventStatusWithAggregatesFilter<"Event"> | $Enums.EventStatus
    date?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    capacity?: IntWithAggregatesFilter<"Event"> | number
    location?: StringWithAggregatesFilter<"Event"> | string
    imageUrl?: StringWithAggregatesFilter<"Event"> | string
    clubId?: IntWithAggregatesFilter<"Event"> | number
    authorId?: StringWithAggregatesFilter<"Event"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableWithAggregatesFilter<"Account"> | number | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumRoleFilter<"User"> | $Enums.Role
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    posts?: PostListRelationFilter
    authoredEvents?: EventListRelationFilter
    rsvps?: RSVPListRelationFilter
    authoredDiscussionThreads?: EventDiscussionThreadListRelationFilter
    authoredDiscussionReplies?: EventDiscussionReplyListRelationFilter
    followedHubs?: HubFollowListRelationFilter
    clubMemberships?: ClubMembershipListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    role?: SortOrder
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
    authoredEvents?: EventOrderByRelationAggregateInput
    rsvps?: RSVPOrderByRelationAggregateInput
    authoredDiscussionThreads?: EventDiscussionThreadOrderByRelationAggregateInput
    authoredDiscussionReplies?: EventDiscussionReplyOrderByRelationAggregateInput
    followedHubs?: HubFollowOrderByRelationAggregateInput
    clubMemberships?: ClubMembershipOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumRoleFilter<"User"> | $Enums.Role
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    posts?: PostListRelationFilter
    authoredEvents?: EventListRelationFilter
    rsvps?: RSVPListRelationFilter
    authoredDiscussionThreads?: EventDiscussionThreadListRelationFilter
    authoredDiscussionReplies?: EventDiscussionReplyListRelationFilter
    followedHubs?: HubFollowListRelationFilter
    clubMemberships?: ClubMembershipListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    role?: SortOrder
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type EventDiscussionThreadWhereInput = {
    AND?: EventDiscussionThreadWhereInput | EventDiscussionThreadWhereInput[]
    OR?: EventDiscussionThreadWhereInput[]
    NOT?: EventDiscussionThreadWhereInput | EventDiscussionThreadWhereInput[]
    id?: IntFilter<"EventDiscussionThread"> | number
    eventId?: IntFilter<"EventDiscussionThread"> | number
    authorId?: StringFilter<"EventDiscussionThread"> | string
    question?: StringFilter<"EventDiscussionThread"> | string
    pinned?: BoolFilter<"EventDiscussionThread"> | boolean
    createdAt?: DateTimeFilter<"EventDiscussionThread"> | Date | string
    updatedAt?: DateTimeFilter<"EventDiscussionThread"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    replies?: EventDiscussionReplyListRelationFilter
  }

  export type EventDiscussionThreadOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    authorId?: SortOrder
    question?: SortOrder
    pinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    event?: EventOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    replies?: EventDiscussionReplyOrderByRelationAggregateInput
  }

  export type EventDiscussionThreadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EventDiscussionThreadWhereInput | EventDiscussionThreadWhereInput[]
    OR?: EventDiscussionThreadWhereInput[]
    NOT?: EventDiscussionThreadWhereInput | EventDiscussionThreadWhereInput[]
    eventId?: IntFilter<"EventDiscussionThread"> | number
    authorId?: StringFilter<"EventDiscussionThread"> | string
    question?: StringFilter<"EventDiscussionThread"> | string
    pinned?: BoolFilter<"EventDiscussionThread"> | boolean
    createdAt?: DateTimeFilter<"EventDiscussionThread"> | Date | string
    updatedAt?: DateTimeFilter<"EventDiscussionThread"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    replies?: EventDiscussionReplyListRelationFilter
  }, "id">

  export type EventDiscussionThreadOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    authorId?: SortOrder
    question?: SortOrder
    pinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventDiscussionThreadCountOrderByAggregateInput
    _avg?: EventDiscussionThreadAvgOrderByAggregateInput
    _max?: EventDiscussionThreadMaxOrderByAggregateInput
    _min?: EventDiscussionThreadMinOrderByAggregateInput
    _sum?: EventDiscussionThreadSumOrderByAggregateInput
  }

  export type EventDiscussionThreadScalarWhereWithAggregatesInput = {
    AND?: EventDiscussionThreadScalarWhereWithAggregatesInput | EventDiscussionThreadScalarWhereWithAggregatesInput[]
    OR?: EventDiscussionThreadScalarWhereWithAggregatesInput[]
    NOT?: EventDiscussionThreadScalarWhereWithAggregatesInput | EventDiscussionThreadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EventDiscussionThread"> | number
    eventId?: IntWithAggregatesFilter<"EventDiscussionThread"> | number
    authorId?: StringWithAggregatesFilter<"EventDiscussionThread"> | string
    question?: StringWithAggregatesFilter<"EventDiscussionThread"> | string
    pinned?: BoolWithAggregatesFilter<"EventDiscussionThread"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"EventDiscussionThread"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EventDiscussionThread"> | Date | string
  }

  export type EventDiscussionReplyWhereInput = {
    AND?: EventDiscussionReplyWhereInput | EventDiscussionReplyWhereInput[]
    OR?: EventDiscussionReplyWhereInput[]
    NOT?: EventDiscussionReplyWhereInput | EventDiscussionReplyWhereInput[]
    id?: IntFilter<"EventDiscussionReply"> | number
    threadId?: IntFilter<"EventDiscussionReply"> | number
    authorId?: StringFilter<"EventDiscussionReply"> | string
    message?: StringFilter<"EventDiscussionReply"> | string
    createdAt?: DateTimeFilter<"EventDiscussionReply"> | Date | string
    updatedAt?: DateTimeFilter<"EventDiscussionReply"> | Date | string
    thread?: XOR<EventDiscussionThreadScalarRelationFilter, EventDiscussionThreadWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EventDiscussionReplyOrderByWithRelationInput = {
    id?: SortOrder
    threadId?: SortOrder
    authorId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    thread?: EventDiscussionThreadOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
  }

  export type EventDiscussionReplyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EventDiscussionReplyWhereInput | EventDiscussionReplyWhereInput[]
    OR?: EventDiscussionReplyWhereInput[]
    NOT?: EventDiscussionReplyWhereInput | EventDiscussionReplyWhereInput[]
    threadId?: IntFilter<"EventDiscussionReply"> | number
    authorId?: StringFilter<"EventDiscussionReply"> | string
    message?: StringFilter<"EventDiscussionReply"> | string
    createdAt?: DateTimeFilter<"EventDiscussionReply"> | Date | string
    updatedAt?: DateTimeFilter<"EventDiscussionReply"> | Date | string
    thread?: XOR<EventDiscussionThreadScalarRelationFilter, EventDiscussionThreadWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type EventDiscussionReplyOrderByWithAggregationInput = {
    id?: SortOrder
    threadId?: SortOrder
    authorId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventDiscussionReplyCountOrderByAggregateInput
    _avg?: EventDiscussionReplyAvgOrderByAggregateInput
    _max?: EventDiscussionReplyMaxOrderByAggregateInput
    _min?: EventDiscussionReplyMinOrderByAggregateInput
    _sum?: EventDiscussionReplySumOrderByAggregateInput
  }

  export type EventDiscussionReplyScalarWhereWithAggregatesInput = {
    AND?: EventDiscussionReplyScalarWhereWithAggregatesInput | EventDiscussionReplyScalarWhereWithAggregatesInput[]
    OR?: EventDiscussionReplyScalarWhereWithAggregatesInput[]
    NOT?: EventDiscussionReplyScalarWhereWithAggregatesInput | EventDiscussionReplyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EventDiscussionReply"> | number
    threadId?: IntWithAggregatesFilter<"EventDiscussionReply"> | number
    authorId?: StringWithAggregatesFilter<"EventDiscussionReply"> | string
    message?: StringWithAggregatesFilter<"EventDiscussionReply"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EventDiscussionReply"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EventDiscussionReply"> | Date | string
  }

  export type ClubMembershipWhereInput = {
    AND?: ClubMembershipWhereInput | ClubMembershipWhereInput[]
    OR?: ClubMembershipWhereInput[]
    NOT?: ClubMembershipWhereInput | ClubMembershipWhereInput[]
    userId?: StringFilter<"ClubMembership"> | string
    clubId?: IntFilter<"ClubMembership"> | number
    role?: EnumClubRoleFilter<"ClubMembership"> | $Enums.ClubRole
    createdAt?: DateTimeFilter<"ClubMembership"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
  }

  export type ClubMembershipOrderByWithRelationInput = {
    userId?: SortOrder
    clubId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    club?: ClubOrderByWithRelationInput
  }

  export type ClubMembershipWhereUniqueInput = Prisma.AtLeast<{
    userId_clubId?: ClubMembershipUserIdClubIdCompoundUniqueInput
    AND?: ClubMembershipWhereInput | ClubMembershipWhereInput[]
    OR?: ClubMembershipWhereInput[]
    NOT?: ClubMembershipWhereInput | ClubMembershipWhereInput[]
    userId?: StringFilter<"ClubMembership"> | string
    clubId?: IntFilter<"ClubMembership"> | number
    role?: EnumClubRoleFilter<"ClubMembership"> | $Enums.ClubRole
    createdAt?: DateTimeFilter<"ClubMembership"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
  }, "userId_clubId">

  export type ClubMembershipOrderByWithAggregationInput = {
    userId?: SortOrder
    clubId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: ClubMembershipCountOrderByAggregateInput
    _avg?: ClubMembershipAvgOrderByAggregateInput
    _max?: ClubMembershipMaxOrderByAggregateInput
    _min?: ClubMembershipMinOrderByAggregateInput
    _sum?: ClubMembershipSumOrderByAggregateInput
  }

  export type ClubMembershipScalarWhereWithAggregatesInput = {
    AND?: ClubMembershipScalarWhereWithAggregatesInput | ClubMembershipScalarWhereWithAggregatesInput[]
    OR?: ClubMembershipScalarWhereWithAggregatesInput[]
    NOT?: ClubMembershipScalarWhereWithAggregatesInput | ClubMembershipScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"ClubMembership"> | string
    clubId?: IntWithAggregatesFilter<"ClubMembership"> | number
    role?: EnumClubRoleWithAggregatesFilter<"ClubMembership"> | $Enums.ClubRole
    createdAt?: DateTimeWithAggregatesFilter<"ClubMembership"> | Date | string
  }

  export type HubFollowWhereInput = {
    AND?: HubFollowWhereInput | HubFollowWhereInput[]
    OR?: HubFollowWhereInput[]
    NOT?: HubFollowWhereInput | HubFollowWhereInput[]
    userId?: StringFilter<"HubFollow"> | string
    clubId?: IntFilter<"HubFollow"> | number
    createdAt?: DateTimeFilter<"HubFollow"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
  }

  export type HubFollowOrderByWithRelationInput = {
    userId?: SortOrder
    clubId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    club?: ClubOrderByWithRelationInput
  }

  export type HubFollowWhereUniqueInput = Prisma.AtLeast<{
    userId_clubId?: HubFollowUserIdClubIdCompoundUniqueInput
    AND?: HubFollowWhereInput | HubFollowWhereInput[]
    OR?: HubFollowWhereInput[]
    NOT?: HubFollowWhereInput | HubFollowWhereInput[]
    userId?: StringFilter<"HubFollow"> | string
    clubId?: IntFilter<"HubFollow"> | number
    createdAt?: DateTimeFilter<"HubFollow"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
  }, "userId_clubId">

  export type HubFollowOrderByWithAggregationInput = {
    userId?: SortOrder
    clubId?: SortOrder
    createdAt?: SortOrder
    _count?: HubFollowCountOrderByAggregateInput
    _avg?: HubFollowAvgOrderByAggregateInput
    _max?: HubFollowMaxOrderByAggregateInput
    _min?: HubFollowMinOrderByAggregateInput
    _sum?: HubFollowSumOrderByAggregateInput
  }

  export type HubFollowScalarWhereWithAggregatesInput = {
    AND?: HubFollowScalarWhereWithAggregatesInput | HubFollowScalarWhereWithAggregatesInput[]
    OR?: HubFollowScalarWhereWithAggregatesInput[]
    NOT?: HubFollowScalarWhereWithAggregatesInput | HubFollowScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"HubFollow"> | string
    clubId?: IntWithAggregatesFilter<"HubFollow"> | number
    createdAt?: DateTimeWithAggregatesFilter<"HubFollow"> | Date | string
  }

  export type HubBlockWhereInput = {
    AND?: HubBlockWhereInput | HubBlockWhereInput[]
    OR?: HubBlockWhereInput[]
    NOT?: HubBlockWhereInput | HubBlockWhereInput[]
    id?: IntFilter<"HubBlock"> | number
    clubId?: IntFilter<"HubBlock"> | number
    type?: EnumHubBlockTypeFilter<"HubBlock"> | $Enums.HubBlockType
    title?: StringNullableFilter<"HubBlock"> | string | null
    content?: StringFilter<"HubBlock"> | string
    linkUrl?: StringNullableFilter<"HubBlock"> | string | null
    position?: IntFilter<"HubBlock"> | number
    createdAt?: DateTimeFilter<"HubBlock"> | Date | string
    updatedAt?: DateTimeFilter<"HubBlock"> | Date | string
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
  }

  export type HubBlockOrderByWithRelationInput = {
    id?: SortOrder
    clubId?: SortOrder
    type?: SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrder
    linkUrl?: SortOrderInput | SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    club?: ClubOrderByWithRelationInput
  }

  export type HubBlockWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: HubBlockWhereInput | HubBlockWhereInput[]
    OR?: HubBlockWhereInput[]
    NOT?: HubBlockWhereInput | HubBlockWhereInput[]
    clubId?: IntFilter<"HubBlock"> | number
    type?: EnumHubBlockTypeFilter<"HubBlock"> | $Enums.HubBlockType
    title?: StringNullableFilter<"HubBlock"> | string | null
    content?: StringFilter<"HubBlock"> | string
    linkUrl?: StringNullableFilter<"HubBlock"> | string | null
    position?: IntFilter<"HubBlock"> | number
    createdAt?: DateTimeFilter<"HubBlock"> | Date | string
    updatedAt?: DateTimeFilter<"HubBlock"> | Date | string
    club?: XOR<ClubScalarRelationFilter, ClubWhereInput>
  }, "id">

  export type HubBlockOrderByWithAggregationInput = {
    id?: SortOrder
    clubId?: SortOrder
    type?: SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrder
    linkUrl?: SortOrderInput | SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HubBlockCountOrderByAggregateInput
    _avg?: HubBlockAvgOrderByAggregateInput
    _max?: HubBlockMaxOrderByAggregateInput
    _min?: HubBlockMinOrderByAggregateInput
    _sum?: HubBlockSumOrderByAggregateInput
  }

  export type HubBlockScalarWhereWithAggregatesInput = {
    AND?: HubBlockScalarWhereWithAggregatesInput | HubBlockScalarWhereWithAggregatesInput[]
    OR?: HubBlockScalarWhereWithAggregatesInput[]
    NOT?: HubBlockScalarWhereWithAggregatesInput | HubBlockScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HubBlock"> | number
    clubId?: IntWithAggregatesFilter<"HubBlock"> | number
    type?: EnumHubBlockTypeWithAggregatesFilter<"HubBlock"> | $Enums.HubBlockType
    title?: StringNullableWithAggregatesFilter<"HubBlock"> | string | null
    content?: StringWithAggregatesFilter<"HubBlock"> | string
    linkUrl?: StringNullableWithAggregatesFilter<"HubBlock"> | string | null
    position?: IntWithAggregatesFilter<"HubBlock"> | number
    createdAt?: DateTimeWithAggregatesFilter<"HubBlock"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HubBlock"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type RSVPWhereInput = {
    AND?: RSVPWhereInput | RSVPWhereInput[]
    OR?: RSVPWhereInput[]
    NOT?: RSVPWhereInput | RSVPWhereInput[]
    id?: IntFilter<"RSVP"> | number
    userId?: StringFilter<"RSVP"> | string
    eventId?: IntFilter<"RSVP"> | number
    status?: StringFilter<"RSVP"> | string
    createdAt?: DateTimeFilter<"RSVP"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }

  export type RSVPOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    event?: EventOrderByWithRelationInput
  }

  export type RSVPWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_eventId?: RSVPUserIdEventIdCompoundUniqueInput
    AND?: RSVPWhereInput | RSVPWhereInput[]
    OR?: RSVPWhereInput[]
    NOT?: RSVPWhereInput | RSVPWhereInput[]
    userId?: StringFilter<"RSVP"> | string
    eventId?: IntFilter<"RSVP"> | number
    status?: StringFilter<"RSVP"> | string
    createdAt?: DateTimeFilter<"RSVP"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }, "id" | "userId_eventId">

  export type RSVPOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: RSVPCountOrderByAggregateInput
    _avg?: RSVPAvgOrderByAggregateInput
    _max?: RSVPMaxOrderByAggregateInput
    _min?: RSVPMinOrderByAggregateInput
    _sum?: RSVPSumOrderByAggregateInput
  }

  export type RSVPScalarWhereWithAggregatesInput = {
    AND?: RSVPScalarWhereWithAggregatesInput | RSVPScalarWhereWithAggregatesInput[]
    OR?: RSVPScalarWhereWithAggregatesInput[]
    NOT?: RSVPScalarWhereWithAggregatesInput | RSVPScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RSVP"> | number
    userId?: StringWithAggregatesFilter<"RSVP"> | string
    eventId?: IntWithAggregatesFilter<"RSVP"> | number
    status?: StringWithAggregatesFilter<"RSVP"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RSVP"> | Date | string
  }

  export type PostCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
  }

  export type PostUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type PostCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
  }

  export type PostUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type ClubCreateInput = {
    name: string
    logoUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutClubInput
    followers?: HubFollowCreateNestedManyWithoutClubInput
    blocks?: HubBlockCreateNestedManyWithoutClubInput
    members?: ClubMembershipCreateNestedManyWithoutClubInput
  }

  export type ClubUncheckedCreateInput = {
    id?: number
    name: string
    logoUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutClubInput
    followers?: HubFollowUncheckedCreateNestedManyWithoutClubInput
    blocks?: HubBlockUncheckedCreateNestedManyWithoutClubInput
    members?: ClubMembershipUncheckedCreateNestedManyWithoutClubInput
  }

  export type ClubUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutClubNestedInput
    followers?: HubFollowUpdateManyWithoutClubNestedInput
    blocks?: HubBlockUpdateManyWithoutClubNestedInput
    members?: ClubMembershipUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutClubNestedInput
    followers?: HubFollowUncheckedUpdateManyWithoutClubNestedInput
    blocks?: HubBlockUncheckedUpdateManyWithoutClubNestedInput
    members?: ClubMembershipUncheckedUpdateManyWithoutClubNestedInput
  }

  export type ClubCreateManyInput = {
    id?: number
    name: string
    logoUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClubUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutAuthoredEventsInput
    club: ClubCreateNestedOneWithoutEventsInput
    rsvps?: RSVPCreateNestedManyWithoutEventInput
    discussionThreads?: EventDiscussionThreadCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    clubId: number
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    rsvps?: RSVPUncheckedCreateNestedManyWithoutEventInput
    discussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutAuthoredEventsNestedInput
    club?: ClubUpdateOneRequiredWithoutEventsNestedInput
    rsvps?: RSVPUpdateManyWithoutEventNestedInput
    discussionThreads?: EventDiscussionThreadUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clubId?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rsvps?: RSVPUncheckedUpdateManyWithoutEventNestedInput
    discussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    clubId: number
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clubId?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventUncheckedCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPUncheckedCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowUncheckedCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUncheckedUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUncheckedUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUncheckedUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
  }

  export type UserUpdateManyMutationInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventDiscussionThreadCreateInput = {
    question: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutDiscussionThreadsInput
    author: UserCreateNestedOneWithoutAuthoredDiscussionThreadsInput
    replies?: EventDiscussionReplyCreateNestedManyWithoutThreadInput
  }

  export type EventDiscussionThreadUncheckedCreateInput = {
    id?: number
    eventId: number
    authorId: string
    question: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: EventDiscussionReplyUncheckedCreateNestedManyWithoutThreadInput
  }

  export type EventDiscussionThreadUpdateInput = {
    question?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutDiscussionThreadsNestedInput
    author?: UserUpdateOneRequiredWithoutAuthoredDiscussionThreadsNestedInput
    replies?: EventDiscussionReplyUpdateManyWithoutThreadNestedInput
  }

  export type EventDiscussionThreadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: EventDiscussionReplyUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type EventDiscussionThreadCreateManyInput = {
    id?: number
    eventId: number
    authorId: string
    question: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDiscussionThreadUpdateManyMutationInput = {
    question?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDiscussionThreadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDiscussionReplyCreateInput = {
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
    thread: EventDiscussionThreadCreateNestedOneWithoutRepliesInput
    author: UserCreateNestedOneWithoutAuthoredDiscussionRepliesInput
  }

  export type EventDiscussionReplyUncheckedCreateInput = {
    id?: number
    threadId: number
    authorId: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDiscussionReplyUpdateInput = {
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thread?: EventDiscussionThreadUpdateOneRequiredWithoutRepliesNestedInput
    author?: UserUpdateOneRequiredWithoutAuthoredDiscussionRepliesNestedInput
  }

  export type EventDiscussionReplyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    threadId?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDiscussionReplyCreateManyInput = {
    id?: number
    threadId: number
    authorId: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDiscussionReplyUpdateManyMutationInput = {
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDiscussionReplyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    threadId?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubMembershipCreateInput = {
    role: $Enums.ClubRole
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutClubMembershipsInput
    club: ClubCreateNestedOneWithoutMembersInput
  }

  export type ClubMembershipUncheckedCreateInput = {
    userId: string
    clubId: number
    role: $Enums.ClubRole
    createdAt?: Date | string
  }

  export type ClubMembershipUpdateInput = {
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClubMembershipsNestedInput
    club?: ClubUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ClubMembershipUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    clubId?: IntFieldUpdateOperationsInput | number
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubMembershipCreateManyInput = {
    userId: string
    clubId: number
    role: $Enums.ClubRole
    createdAt?: Date | string
  }

  export type ClubMembershipUpdateManyMutationInput = {
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubMembershipUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    clubId?: IntFieldUpdateOperationsInput | number
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubFollowCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFollowedHubsInput
    club: ClubCreateNestedOneWithoutFollowersInput
  }

  export type HubFollowUncheckedCreateInput = {
    userId: string
    clubId: number
    createdAt?: Date | string
  }

  export type HubFollowUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFollowedHubsNestedInput
    club?: ClubUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type HubFollowUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    clubId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubFollowCreateManyInput = {
    userId: string
    clubId: number
    createdAt?: Date | string
  }

  export type HubFollowUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubFollowUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    clubId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubBlockCreateInput = {
    type: $Enums.HubBlockType
    title?: string | null
    content: string
    linkUrl?: string | null
    position: number
    createdAt?: Date | string
    updatedAt?: Date | string
    club: ClubCreateNestedOneWithoutBlocksInput
  }

  export type HubBlockUncheckedCreateInput = {
    id?: number
    clubId: number
    type: $Enums.HubBlockType
    title?: string | null
    content: string
    linkUrl?: string | null
    position: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HubBlockUpdateInput = {
    type?: EnumHubBlockTypeFieldUpdateOperationsInput | $Enums.HubBlockType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutBlocksNestedInput
  }

  export type HubBlockUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    clubId?: IntFieldUpdateOperationsInput | number
    type?: EnumHubBlockTypeFieldUpdateOperationsInput | $Enums.HubBlockType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubBlockCreateManyInput = {
    id?: number
    clubId: number
    type: $Enums.HubBlockType
    title?: string | null
    content: string
    linkUrl?: string | null
    position: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HubBlockUpdateManyMutationInput = {
    type?: EnumHubBlockTypeFieldUpdateOperationsInput | $Enums.HubBlockType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubBlockUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    clubId?: IntFieldUpdateOperationsInput | number
    type?: EnumHubBlockTypeFieldUpdateOperationsInput | $Enums.HubBlockType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RSVPCreateInput = {
    status?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRsvpsInput
    event: EventCreateNestedOneWithoutRsvpsInput
  }

  export type RSVPUncheckedCreateInput = {
    id?: number
    userId: string
    eventId: number
    status?: string
    createdAt?: Date | string
  }

  export type RSVPUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRsvpsNestedInput
    event?: EventUpdateOneRequiredWithoutRsvpsNestedInput
  }

  export type RSVPUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    eventId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RSVPCreateManyInput = {
    id?: number
    userId: string
    eventId: number
    status?: string
    createdAt?: Date | string
  }

  export type RSVPUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RSVPUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    eventId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type HubFollowListRelationFilter = {
    every?: HubFollowWhereInput
    some?: HubFollowWhereInput
    none?: HubFollowWhereInput
  }

  export type HubBlockListRelationFilter = {
    every?: HubBlockWhereInput
    some?: HubBlockWhereInput
    none?: HubBlockWhereInput
  }

  export type ClubMembershipListRelationFilter = {
    every?: ClubMembershipWhereInput
    some?: ClubMembershipWhereInput
    none?: ClubMembershipWhereInput
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HubFollowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HubBlockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClubMembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClubCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClubAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClubMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClubMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClubSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusFilter<$PrismaModel> | $Enums.EventStatus
  }

  export type ClubScalarRelationFilter = {
    is?: ClubWhereInput
    isNot?: ClubWhereInput
  }

  export type RSVPListRelationFilter = {
    every?: RSVPWhereInput
    some?: RSVPWhereInput
    none?: RSVPWhereInput
  }

  export type EventDiscussionThreadListRelationFilter = {
    every?: EventDiscussionThreadWhereInput
    some?: EventDiscussionThreadWhereInput
    none?: EventDiscussionThreadWhereInput
  }

  export type RSVPOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventDiscussionThreadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    date?: SortOrder
    capacity?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    clubId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
    clubId?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    date?: SortOrder
    capacity?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    clubId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    date?: SortOrder
    capacity?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    clubId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
    clubId?: SortOrder
  }

  export type EnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type EventDiscussionReplyListRelationFilter = {
    every?: EventDiscussionReplyWhereInput
    some?: EventDiscussionReplyWhereInput
    none?: EventDiscussionReplyWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventDiscussionReplyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    role?: SortOrder
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    role?: SortOrder
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    role?: SortOrder
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type EventDiscussionThreadCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    authorId?: SortOrder
    question?: SortOrder
    pinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventDiscussionThreadAvgOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
  }

  export type EventDiscussionThreadMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    authorId?: SortOrder
    question?: SortOrder
    pinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventDiscussionThreadMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    authorId?: SortOrder
    question?: SortOrder
    pinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventDiscussionThreadSumOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EventDiscussionThreadScalarRelationFilter = {
    is?: EventDiscussionThreadWhereInput
    isNot?: EventDiscussionThreadWhereInput
  }

  export type EventDiscussionReplyCountOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    authorId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventDiscussionReplyAvgOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
  }

  export type EventDiscussionReplyMaxOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    authorId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventDiscussionReplyMinOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    authorId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventDiscussionReplySumOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
  }

  export type EnumClubRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ClubRole | EnumClubRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumClubRoleFilter<$PrismaModel> | $Enums.ClubRole
  }

  export type ClubMembershipUserIdClubIdCompoundUniqueInput = {
    userId: string
    clubId: number
  }

  export type ClubMembershipCountOrderByAggregateInput = {
    userId?: SortOrder
    clubId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type ClubMembershipAvgOrderByAggregateInput = {
    clubId?: SortOrder
  }

  export type ClubMembershipMaxOrderByAggregateInput = {
    userId?: SortOrder
    clubId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type ClubMembershipMinOrderByAggregateInput = {
    userId?: SortOrder
    clubId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type ClubMembershipSumOrderByAggregateInput = {
    clubId?: SortOrder
  }

  export type EnumClubRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClubRole | EnumClubRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumClubRoleWithAggregatesFilter<$PrismaModel> | $Enums.ClubRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClubRoleFilter<$PrismaModel>
    _max?: NestedEnumClubRoleFilter<$PrismaModel>
  }

  export type HubFollowUserIdClubIdCompoundUniqueInput = {
    userId: string
    clubId: number
  }

  export type HubFollowCountOrderByAggregateInput = {
    userId?: SortOrder
    clubId?: SortOrder
    createdAt?: SortOrder
  }

  export type HubFollowAvgOrderByAggregateInput = {
    clubId?: SortOrder
  }

  export type HubFollowMaxOrderByAggregateInput = {
    userId?: SortOrder
    clubId?: SortOrder
    createdAt?: SortOrder
  }

  export type HubFollowMinOrderByAggregateInput = {
    userId?: SortOrder
    clubId?: SortOrder
    createdAt?: SortOrder
  }

  export type HubFollowSumOrderByAggregateInput = {
    clubId?: SortOrder
  }

  export type EnumHubBlockTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.HubBlockType | EnumHubBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HubBlockType[] | ListEnumHubBlockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HubBlockType[] | ListEnumHubBlockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHubBlockTypeFilter<$PrismaModel> | $Enums.HubBlockType
  }

  export type HubBlockCountOrderByAggregateInput = {
    id?: SortOrder
    clubId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    linkUrl?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HubBlockAvgOrderByAggregateInput = {
    id?: SortOrder
    clubId?: SortOrder
    position?: SortOrder
  }

  export type HubBlockMaxOrderByAggregateInput = {
    id?: SortOrder
    clubId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    linkUrl?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HubBlockMinOrderByAggregateInput = {
    id?: SortOrder
    clubId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    linkUrl?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HubBlockSumOrderByAggregateInput = {
    id?: SortOrder
    clubId?: SortOrder
    position?: SortOrder
  }

  export type EnumHubBlockTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HubBlockType | EnumHubBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HubBlockType[] | ListEnumHubBlockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HubBlockType[] | ListEnumHubBlockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHubBlockTypeWithAggregatesFilter<$PrismaModel> | $Enums.HubBlockType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHubBlockTypeFilter<$PrismaModel>
    _max?: NestedEnumHubBlockTypeFilter<$PrismaModel>
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type RSVPUserIdEventIdCompoundUniqueInput = {
    userId: string
    eventId: number
  }

  export type RSVPCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type RSVPAvgOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
  }

  export type RSVPMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type RSVPMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type RSVPSumOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventCreateNestedManyWithoutClubInput = {
    create?: XOR<EventCreateWithoutClubInput, EventUncheckedCreateWithoutClubInput> | EventCreateWithoutClubInput[] | EventUncheckedCreateWithoutClubInput[]
    connectOrCreate?: EventCreateOrConnectWithoutClubInput | EventCreateOrConnectWithoutClubInput[]
    createMany?: EventCreateManyClubInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type HubFollowCreateNestedManyWithoutClubInput = {
    create?: XOR<HubFollowCreateWithoutClubInput, HubFollowUncheckedCreateWithoutClubInput> | HubFollowCreateWithoutClubInput[] | HubFollowUncheckedCreateWithoutClubInput[]
    connectOrCreate?: HubFollowCreateOrConnectWithoutClubInput | HubFollowCreateOrConnectWithoutClubInput[]
    createMany?: HubFollowCreateManyClubInputEnvelope
    connect?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
  }

  export type HubBlockCreateNestedManyWithoutClubInput = {
    create?: XOR<HubBlockCreateWithoutClubInput, HubBlockUncheckedCreateWithoutClubInput> | HubBlockCreateWithoutClubInput[] | HubBlockUncheckedCreateWithoutClubInput[]
    connectOrCreate?: HubBlockCreateOrConnectWithoutClubInput | HubBlockCreateOrConnectWithoutClubInput[]
    createMany?: HubBlockCreateManyClubInputEnvelope
    connect?: HubBlockWhereUniqueInput | HubBlockWhereUniqueInput[]
  }

  export type ClubMembershipCreateNestedManyWithoutClubInput = {
    create?: XOR<ClubMembershipCreateWithoutClubInput, ClubMembershipUncheckedCreateWithoutClubInput> | ClubMembershipCreateWithoutClubInput[] | ClubMembershipUncheckedCreateWithoutClubInput[]
    connectOrCreate?: ClubMembershipCreateOrConnectWithoutClubInput | ClubMembershipCreateOrConnectWithoutClubInput[]
    createMany?: ClubMembershipCreateManyClubInputEnvelope
    connect?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutClubInput = {
    create?: XOR<EventCreateWithoutClubInput, EventUncheckedCreateWithoutClubInput> | EventCreateWithoutClubInput[] | EventUncheckedCreateWithoutClubInput[]
    connectOrCreate?: EventCreateOrConnectWithoutClubInput | EventCreateOrConnectWithoutClubInput[]
    createMany?: EventCreateManyClubInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type HubFollowUncheckedCreateNestedManyWithoutClubInput = {
    create?: XOR<HubFollowCreateWithoutClubInput, HubFollowUncheckedCreateWithoutClubInput> | HubFollowCreateWithoutClubInput[] | HubFollowUncheckedCreateWithoutClubInput[]
    connectOrCreate?: HubFollowCreateOrConnectWithoutClubInput | HubFollowCreateOrConnectWithoutClubInput[]
    createMany?: HubFollowCreateManyClubInputEnvelope
    connect?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
  }

  export type HubBlockUncheckedCreateNestedManyWithoutClubInput = {
    create?: XOR<HubBlockCreateWithoutClubInput, HubBlockUncheckedCreateWithoutClubInput> | HubBlockCreateWithoutClubInput[] | HubBlockUncheckedCreateWithoutClubInput[]
    connectOrCreate?: HubBlockCreateOrConnectWithoutClubInput | HubBlockCreateOrConnectWithoutClubInput[]
    createMany?: HubBlockCreateManyClubInputEnvelope
    connect?: HubBlockWhereUniqueInput | HubBlockWhereUniqueInput[]
  }

  export type ClubMembershipUncheckedCreateNestedManyWithoutClubInput = {
    create?: XOR<ClubMembershipCreateWithoutClubInput, ClubMembershipUncheckedCreateWithoutClubInput> | ClubMembershipCreateWithoutClubInput[] | ClubMembershipUncheckedCreateWithoutClubInput[]
    connectOrCreate?: ClubMembershipCreateOrConnectWithoutClubInput | ClubMembershipCreateOrConnectWithoutClubInput[]
    createMany?: ClubMembershipCreateManyClubInputEnvelope
    connect?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
  }

  export type EventUpdateManyWithoutClubNestedInput = {
    create?: XOR<EventCreateWithoutClubInput, EventUncheckedCreateWithoutClubInput> | EventCreateWithoutClubInput[] | EventUncheckedCreateWithoutClubInput[]
    connectOrCreate?: EventCreateOrConnectWithoutClubInput | EventCreateOrConnectWithoutClubInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutClubInput | EventUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: EventCreateManyClubInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutClubInput | EventUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: EventUpdateManyWithWhereWithoutClubInput | EventUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type HubFollowUpdateManyWithoutClubNestedInput = {
    create?: XOR<HubFollowCreateWithoutClubInput, HubFollowUncheckedCreateWithoutClubInput> | HubFollowCreateWithoutClubInput[] | HubFollowUncheckedCreateWithoutClubInput[]
    connectOrCreate?: HubFollowCreateOrConnectWithoutClubInput | HubFollowCreateOrConnectWithoutClubInput[]
    upsert?: HubFollowUpsertWithWhereUniqueWithoutClubInput | HubFollowUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: HubFollowCreateManyClubInputEnvelope
    set?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    disconnect?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    delete?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    connect?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    update?: HubFollowUpdateWithWhereUniqueWithoutClubInput | HubFollowUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: HubFollowUpdateManyWithWhereWithoutClubInput | HubFollowUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: HubFollowScalarWhereInput | HubFollowScalarWhereInput[]
  }

  export type HubBlockUpdateManyWithoutClubNestedInput = {
    create?: XOR<HubBlockCreateWithoutClubInput, HubBlockUncheckedCreateWithoutClubInput> | HubBlockCreateWithoutClubInput[] | HubBlockUncheckedCreateWithoutClubInput[]
    connectOrCreate?: HubBlockCreateOrConnectWithoutClubInput | HubBlockCreateOrConnectWithoutClubInput[]
    upsert?: HubBlockUpsertWithWhereUniqueWithoutClubInput | HubBlockUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: HubBlockCreateManyClubInputEnvelope
    set?: HubBlockWhereUniqueInput | HubBlockWhereUniqueInput[]
    disconnect?: HubBlockWhereUniqueInput | HubBlockWhereUniqueInput[]
    delete?: HubBlockWhereUniqueInput | HubBlockWhereUniqueInput[]
    connect?: HubBlockWhereUniqueInput | HubBlockWhereUniqueInput[]
    update?: HubBlockUpdateWithWhereUniqueWithoutClubInput | HubBlockUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: HubBlockUpdateManyWithWhereWithoutClubInput | HubBlockUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: HubBlockScalarWhereInput | HubBlockScalarWhereInput[]
  }

  export type ClubMembershipUpdateManyWithoutClubNestedInput = {
    create?: XOR<ClubMembershipCreateWithoutClubInput, ClubMembershipUncheckedCreateWithoutClubInput> | ClubMembershipCreateWithoutClubInput[] | ClubMembershipUncheckedCreateWithoutClubInput[]
    connectOrCreate?: ClubMembershipCreateOrConnectWithoutClubInput | ClubMembershipCreateOrConnectWithoutClubInput[]
    upsert?: ClubMembershipUpsertWithWhereUniqueWithoutClubInput | ClubMembershipUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: ClubMembershipCreateManyClubInputEnvelope
    set?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    disconnect?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    delete?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    connect?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    update?: ClubMembershipUpdateWithWhereUniqueWithoutClubInput | ClubMembershipUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: ClubMembershipUpdateManyWithWhereWithoutClubInput | ClubMembershipUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: ClubMembershipScalarWhereInput | ClubMembershipScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutClubNestedInput = {
    create?: XOR<EventCreateWithoutClubInput, EventUncheckedCreateWithoutClubInput> | EventCreateWithoutClubInput[] | EventUncheckedCreateWithoutClubInput[]
    connectOrCreate?: EventCreateOrConnectWithoutClubInput | EventCreateOrConnectWithoutClubInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutClubInput | EventUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: EventCreateManyClubInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutClubInput | EventUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: EventUpdateManyWithWhereWithoutClubInput | EventUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type HubFollowUncheckedUpdateManyWithoutClubNestedInput = {
    create?: XOR<HubFollowCreateWithoutClubInput, HubFollowUncheckedCreateWithoutClubInput> | HubFollowCreateWithoutClubInput[] | HubFollowUncheckedCreateWithoutClubInput[]
    connectOrCreate?: HubFollowCreateOrConnectWithoutClubInput | HubFollowCreateOrConnectWithoutClubInput[]
    upsert?: HubFollowUpsertWithWhereUniqueWithoutClubInput | HubFollowUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: HubFollowCreateManyClubInputEnvelope
    set?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    disconnect?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    delete?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    connect?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    update?: HubFollowUpdateWithWhereUniqueWithoutClubInput | HubFollowUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: HubFollowUpdateManyWithWhereWithoutClubInput | HubFollowUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: HubFollowScalarWhereInput | HubFollowScalarWhereInput[]
  }

  export type HubBlockUncheckedUpdateManyWithoutClubNestedInput = {
    create?: XOR<HubBlockCreateWithoutClubInput, HubBlockUncheckedCreateWithoutClubInput> | HubBlockCreateWithoutClubInput[] | HubBlockUncheckedCreateWithoutClubInput[]
    connectOrCreate?: HubBlockCreateOrConnectWithoutClubInput | HubBlockCreateOrConnectWithoutClubInput[]
    upsert?: HubBlockUpsertWithWhereUniqueWithoutClubInput | HubBlockUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: HubBlockCreateManyClubInputEnvelope
    set?: HubBlockWhereUniqueInput | HubBlockWhereUniqueInput[]
    disconnect?: HubBlockWhereUniqueInput | HubBlockWhereUniqueInput[]
    delete?: HubBlockWhereUniqueInput | HubBlockWhereUniqueInput[]
    connect?: HubBlockWhereUniqueInput | HubBlockWhereUniqueInput[]
    update?: HubBlockUpdateWithWhereUniqueWithoutClubInput | HubBlockUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: HubBlockUpdateManyWithWhereWithoutClubInput | HubBlockUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: HubBlockScalarWhereInput | HubBlockScalarWhereInput[]
  }

  export type ClubMembershipUncheckedUpdateManyWithoutClubNestedInput = {
    create?: XOR<ClubMembershipCreateWithoutClubInput, ClubMembershipUncheckedCreateWithoutClubInput> | ClubMembershipCreateWithoutClubInput[] | ClubMembershipUncheckedCreateWithoutClubInput[]
    connectOrCreate?: ClubMembershipCreateOrConnectWithoutClubInput | ClubMembershipCreateOrConnectWithoutClubInput[]
    upsert?: ClubMembershipUpsertWithWhereUniqueWithoutClubInput | ClubMembershipUpsertWithWhereUniqueWithoutClubInput[]
    createMany?: ClubMembershipCreateManyClubInputEnvelope
    set?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    disconnect?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    delete?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    connect?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    update?: ClubMembershipUpdateWithWhereUniqueWithoutClubInput | ClubMembershipUpdateWithWhereUniqueWithoutClubInput[]
    updateMany?: ClubMembershipUpdateManyWithWhereWithoutClubInput | ClubMembershipUpdateManyWithWhereWithoutClubInput[]
    deleteMany?: ClubMembershipScalarWhereInput | ClubMembershipScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAuthoredEventsInput = {
    create?: XOR<UserCreateWithoutAuthoredEventsInput, UserUncheckedCreateWithoutAuthoredEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthoredEventsInput
    connect?: UserWhereUniqueInput
  }

  export type ClubCreateNestedOneWithoutEventsInput = {
    create?: XOR<ClubCreateWithoutEventsInput, ClubUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ClubCreateOrConnectWithoutEventsInput
    connect?: ClubWhereUniqueInput
  }

  export type RSVPCreateNestedManyWithoutEventInput = {
    create?: XOR<RSVPCreateWithoutEventInput, RSVPUncheckedCreateWithoutEventInput> | RSVPCreateWithoutEventInput[] | RSVPUncheckedCreateWithoutEventInput[]
    connectOrCreate?: RSVPCreateOrConnectWithoutEventInput | RSVPCreateOrConnectWithoutEventInput[]
    createMany?: RSVPCreateManyEventInputEnvelope
    connect?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
  }

  export type EventDiscussionThreadCreateNestedManyWithoutEventInput = {
    create?: XOR<EventDiscussionThreadCreateWithoutEventInput, EventDiscussionThreadUncheckedCreateWithoutEventInput> | EventDiscussionThreadCreateWithoutEventInput[] | EventDiscussionThreadUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventDiscussionThreadCreateOrConnectWithoutEventInput | EventDiscussionThreadCreateOrConnectWithoutEventInput[]
    createMany?: EventDiscussionThreadCreateManyEventInputEnvelope
    connect?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
  }

  export type RSVPUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<RSVPCreateWithoutEventInput, RSVPUncheckedCreateWithoutEventInput> | RSVPCreateWithoutEventInput[] | RSVPUncheckedCreateWithoutEventInput[]
    connectOrCreate?: RSVPCreateOrConnectWithoutEventInput | RSVPCreateOrConnectWithoutEventInput[]
    createMany?: RSVPCreateManyEventInputEnvelope
    connect?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
  }

  export type EventDiscussionThreadUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<EventDiscussionThreadCreateWithoutEventInput, EventDiscussionThreadUncheckedCreateWithoutEventInput> | EventDiscussionThreadCreateWithoutEventInput[] | EventDiscussionThreadUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventDiscussionThreadCreateOrConnectWithoutEventInput | EventDiscussionThreadCreateOrConnectWithoutEventInput[]
    createMany?: EventDiscussionThreadCreateManyEventInputEnvelope
    connect?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
  }

  export type EnumEventStatusFieldUpdateOperationsInput = {
    set?: $Enums.EventStatus
  }

  export type UserUpdateOneRequiredWithoutAuthoredEventsNestedInput = {
    create?: XOR<UserCreateWithoutAuthoredEventsInput, UserUncheckedCreateWithoutAuthoredEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthoredEventsInput
    upsert?: UserUpsertWithoutAuthoredEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthoredEventsInput, UserUpdateWithoutAuthoredEventsInput>, UserUncheckedUpdateWithoutAuthoredEventsInput>
  }

  export type ClubUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<ClubCreateWithoutEventsInput, ClubUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ClubCreateOrConnectWithoutEventsInput
    upsert?: ClubUpsertWithoutEventsInput
    connect?: ClubWhereUniqueInput
    update?: XOR<XOR<ClubUpdateToOneWithWhereWithoutEventsInput, ClubUpdateWithoutEventsInput>, ClubUncheckedUpdateWithoutEventsInput>
  }

  export type RSVPUpdateManyWithoutEventNestedInput = {
    create?: XOR<RSVPCreateWithoutEventInput, RSVPUncheckedCreateWithoutEventInput> | RSVPCreateWithoutEventInput[] | RSVPUncheckedCreateWithoutEventInput[]
    connectOrCreate?: RSVPCreateOrConnectWithoutEventInput | RSVPCreateOrConnectWithoutEventInput[]
    upsert?: RSVPUpsertWithWhereUniqueWithoutEventInput | RSVPUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: RSVPCreateManyEventInputEnvelope
    set?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    disconnect?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    delete?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    connect?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    update?: RSVPUpdateWithWhereUniqueWithoutEventInput | RSVPUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: RSVPUpdateManyWithWhereWithoutEventInput | RSVPUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: RSVPScalarWhereInput | RSVPScalarWhereInput[]
  }

  export type EventDiscussionThreadUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventDiscussionThreadCreateWithoutEventInput, EventDiscussionThreadUncheckedCreateWithoutEventInput> | EventDiscussionThreadCreateWithoutEventInput[] | EventDiscussionThreadUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventDiscussionThreadCreateOrConnectWithoutEventInput | EventDiscussionThreadCreateOrConnectWithoutEventInput[]
    upsert?: EventDiscussionThreadUpsertWithWhereUniqueWithoutEventInput | EventDiscussionThreadUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventDiscussionThreadCreateManyEventInputEnvelope
    set?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    disconnect?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    delete?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    connect?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    update?: EventDiscussionThreadUpdateWithWhereUniqueWithoutEventInput | EventDiscussionThreadUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventDiscussionThreadUpdateManyWithWhereWithoutEventInput | EventDiscussionThreadUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventDiscussionThreadScalarWhereInput | EventDiscussionThreadScalarWhereInput[]
  }

  export type RSVPUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<RSVPCreateWithoutEventInput, RSVPUncheckedCreateWithoutEventInput> | RSVPCreateWithoutEventInput[] | RSVPUncheckedCreateWithoutEventInput[]
    connectOrCreate?: RSVPCreateOrConnectWithoutEventInput | RSVPCreateOrConnectWithoutEventInput[]
    upsert?: RSVPUpsertWithWhereUniqueWithoutEventInput | RSVPUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: RSVPCreateManyEventInputEnvelope
    set?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    disconnect?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    delete?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    connect?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    update?: RSVPUpdateWithWhereUniqueWithoutEventInput | RSVPUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: RSVPUpdateManyWithWhereWithoutEventInput | RSVPUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: RSVPScalarWhereInput | RSVPScalarWhereInput[]
  }

  export type EventDiscussionThreadUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventDiscussionThreadCreateWithoutEventInput, EventDiscussionThreadUncheckedCreateWithoutEventInput> | EventDiscussionThreadCreateWithoutEventInput[] | EventDiscussionThreadUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventDiscussionThreadCreateOrConnectWithoutEventInput | EventDiscussionThreadCreateOrConnectWithoutEventInput[]
    upsert?: EventDiscussionThreadUpsertWithWhereUniqueWithoutEventInput | EventDiscussionThreadUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventDiscussionThreadCreateManyEventInputEnvelope
    set?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    disconnect?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    delete?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    connect?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    update?: EventDiscussionThreadUpdateWithWhereUniqueWithoutEventInput | EventDiscussionThreadUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventDiscussionThreadUpdateManyWithWhereWithoutEventInput | EventDiscussionThreadUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventDiscussionThreadScalarWhereInput | EventDiscussionThreadScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<PostCreateWithoutCreatedByInput, PostUncheckedCreateWithoutCreatedByInput> | PostCreateWithoutCreatedByInput[] | PostUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCreatedByInput | PostCreateOrConnectWithoutCreatedByInput[]
    createMany?: PostCreateManyCreatedByInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutAuthorInput = {
    create?: XOR<EventCreateWithoutAuthorInput, EventUncheckedCreateWithoutAuthorInput> | EventCreateWithoutAuthorInput[] | EventUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: EventCreateOrConnectWithoutAuthorInput | EventCreateOrConnectWithoutAuthorInput[]
    createMany?: EventCreateManyAuthorInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type RSVPCreateNestedManyWithoutUserInput = {
    create?: XOR<RSVPCreateWithoutUserInput, RSVPUncheckedCreateWithoutUserInput> | RSVPCreateWithoutUserInput[] | RSVPUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RSVPCreateOrConnectWithoutUserInput | RSVPCreateOrConnectWithoutUserInput[]
    createMany?: RSVPCreateManyUserInputEnvelope
    connect?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
  }

  export type EventDiscussionThreadCreateNestedManyWithoutAuthorInput = {
    create?: XOR<EventDiscussionThreadCreateWithoutAuthorInput, EventDiscussionThreadUncheckedCreateWithoutAuthorInput> | EventDiscussionThreadCreateWithoutAuthorInput[] | EventDiscussionThreadUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: EventDiscussionThreadCreateOrConnectWithoutAuthorInput | EventDiscussionThreadCreateOrConnectWithoutAuthorInput[]
    createMany?: EventDiscussionThreadCreateManyAuthorInputEnvelope
    connect?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
  }

  export type EventDiscussionReplyCreateNestedManyWithoutAuthorInput = {
    create?: XOR<EventDiscussionReplyCreateWithoutAuthorInput, EventDiscussionReplyUncheckedCreateWithoutAuthorInput> | EventDiscussionReplyCreateWithoutAuthorInput[] | EventDiscussionReplyUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: EventDiscussionReplyCreateOrConnectWithoutAuthorInput | EventDiscussionReplyCreateOrConnectWithoutAuthorInput[]
    createMany?: EventDiscussionReplyCreateManyAuthorInputEnvelope
    connect?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
  }

  export type HubFollowCreateNestedManyWithoutUserInput = {
    create?: XOR<HubFollowCreateWithoutUserInput, HubFollowUncheckedCreateWithoutUserInput> | HubFollowCreateWithoutUserInput[] | HubFollowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HubFollowCreateOrConnectWithoutUserInput | HubFollowCreateOrConnectWithoutUserInput[]
    createMany?: HubFollowCreateManyUserInputEnvelope
    connect?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
  }

  export type ClubMembershipCreateNestedManyWithoutUserInput = {
    create?: XOR<ClubMembershipCreateWithoutUserInput, ClubMembershipUncheckedCreateWithoutUserInput> | ClubMembershipCreateWithoutUserInput[] | ClubMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClubMembershipCreateOrConnectWithoutUserInput | ClubMembershipCreateOrConnectWithoutUserInput[]
    createMany?: ClubMembershipCreateManyUserInputEnvelope
    connect?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<PostCreateWithoutCreatedByInput, PostUncheckedCreateWithoutCreatedByInput> | PostCreateWithoutCreatedByInput[] | PostUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCreatedByInput | PostCreateOrConnectWithoutCreatedByInput[]
    createMany?: PostCreateManyCreatedByInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<EventCreateWithoutAuthorInput, EventUncheckedCreateWithoutAuthorInput> | EventCreateWithoutAuthorInput[] | EventUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: EventCreateOrConnectWithoutAuthorInput | EventCreateOrConnectWithoutAuthorInput[]
    createMany?: EventCreateManyAuthorInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type RSVPUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RSVPCreateWithoutUserInput, RSVPUncheckedCreateWithoutUserInput> | RSVPCreateWithoutUserInput[] | RSVPUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RSVPCreateOrConnectWithoutUserInput | RSVPCreateOrConnectWithoutUserInput[]
    createMany?: RSVPCreateManyUserInputEnvelope
    connect?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
  }

  export type EventDiscussionThreadUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<EventDiscussionThreadCreateWithoutAuthorInput, EventDiscussionThreadUncheckedCreateWithoutAuthorInput> | EventDiscussionThreadCreateWithoutAuthorInput[] | EventDiscussionThreadUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: EventDiscussionThreadCreateOrConnectWithoutAuthorInput | EventDiscussionThreadCreateOrConnectWithoutAuthorInput[]
    createMany?: EventDiscussionThreadCreateManyAuthorInputEnvelope
    connect?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
  }

  export type EventDiscussionReplyUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<EventDiscussionReplyCreateWithoutAuthorInput, EventDiscussionReplyUncheckedCreateWithoutAuthorInput> | EventDiscussionReplyCreateWithoutAuthorInput[] | EventDiscussionReplyUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: EventDiscussionReplyCreateOrConnectWithoutAuthorInput | EventDiscussionReplyCreateOrConnectWithoutAuthorInput[]
    createMany?: EventDiscussionReplyCreateManyAuthorInputEnvelope
    connect?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
  }

  export type HubFollowUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<HubFollowCreateWithoutUserInput, HubFollowUncheckedCreateWithoutUserInput> | HubFollowCreateWithoutUserInput[] | HubFollowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HubFollowCreateOrConnectWithoutUserInput | HubFollowCreateOrConnectWithoutUserInput[]
    createMany?: HubFollowCreateManyUserInputEnvelope
    connect?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
  }

  export type ClubMembershipUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ClubMembershipCreateWithoutUserInput, ClubMembershipUncheckedCreateWithoutUserInput> | ClubMembershipCreateWithoutUserInput[] | ClubMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClubMembershipCreateOrConnectWithoutUserInput | ClubMembershipCreateOrConnectWithoutUserInput[]
    createMany?: ClubMembershipCreateManyUserInputEnvelope
    connect?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type PostUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<PostCreateWithoutCreatedByInput, PostUncheckedCreateWithoutCreatedByInput> | PostCreateWithoutCreatedByInput[] | PostUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCreatedByInput | PostCreateOrConnectWithoutCreatedByInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutCreatedByInput | PostUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: PostCreateManyCreatedByInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutCreatedByInput | PostUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: PostUpdateManyWithWhereWithoutCreatedByInput | PostUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type EventUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<EventCreateWithoutAuthorInput, EventUncheckedCreateWithoutAuthorInput> | EventCreateWithoutAuthorInput[] | EventUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: EventCreateOrConnectWithoutAuthorInput | EventCreateOrConnectWithoutAuthorInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutAuthorInput | EventUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: EventCreateManyAuthorInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutAuthorInput | EventUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: EventUpdateManyWithWhereWithoutAuthorInput | EventUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type RSVPUpdateManyWithoutUserNestedInput = {
    create?: XOR<RSVPCreateWithoutUserInput, RSVPUncheckedCreateWithoutUserInput> | RSVPCreateWithoutUserInput[] | RSVPUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RSVPCreateOrConnectWithoutUserInput | RSVPCreateOrConnectWithoutUserInput[]
    upsert?: RSVPUpsertWithWhereUniqueWithoutUserInput | RSVPUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RSVPCreateManyUserInputEnvelope
    set?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    disconnect?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    delete?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    connect?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    update?: RSVPUpdateWithWhereUniqueWithoutUserInput | RSVPUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RSVPUpdateManyWithWhereWithoutUserInput | RSVPUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RSVPScalarWhereInput | RSVPScalarWhereInput[]
  }

  export type EventDiscussionThreadUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<EventDiscussionThreadCreateWithoutAuthorInput, EventDiscussionThreadUncheckedCreateWithoutAuthorInput> | EventDiscussionThreadCreateWithoutAuthorInput[] | EventDiscussionThreadUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: EventDiscussionThreadCreateOrConnectWithoutAuthorInput | EventDiscussionThreadCreateOrConnectWithoutAuthorInput[]
    upsert?: EventDiscussionThreadUpsertWithWhereUniqueWithoutAuthorInput | EventDiscussionThreadUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: EventDiscussionThreadCreateManyAuthorInputEnvelope
    set?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    disconnect?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    delete?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    connect?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    update?: EventDiscussionThreadUpdateWithWhereUniqueWithoutAuthorInput | EventDiscussionThreadUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: EventDiscussionThreadUpdateManyWithWhereWithoutAuthorInput | EventDiscussionThreadUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: EventDiscussionThreadScalarWhereInput | EventDiscussionThreadScalarWhereInput[]
  }

  export type EventDiscussionReplyUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<EventDiscussionReplyCreateWithoutAuthorInput, EventDiscussionReplyUncheckedCreateWithoutAuthorInput> | EventDiscussionReplyCreateWithoutAuthorInput[] | EventDiscussionReplyUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: EventDiscussionReplyCreateOrConnectWithoutAuthorInput | EventDiscussionReplyCreateOrConnectWithoutAuthorInput[]
    upsert?: EventDiscussionReplyUpsertWithWhereUniqueWithoutAuthorInput | EventDiscussionReplyUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: EventDiscussionReplyCreateManyAuthorInputEnvelope
    set?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    disconnect?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    delete?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    connect?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    update?: EventDiscussionReplyUpdateWithWhereUniqueWithoutAuthorInput | EventDiscussionReplyUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: EventDiscussionReplyUpdateManyWithWhereWithoutAuthorInput | EventDiscussionReplyUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: EventDiscussionReplyScalarWhereInput | EventDiscussionReplyScalarWhereInput[]
  }

  export type HubFollowUpdateManyWithoutUserNestedInput = {
    create?: XOR<HubFollowCreateWithoutUserInput, HubFollowUncheckedCreateWithoutUserInput> | HubFollowCreateWithoutUserInput[] | HubFollowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HubFollowCreateOrConnectWithoutUserInput | HubFollowCreateOrConnectWithoutUserInput[]
    upsert?: HubFollowUpsertWithWhereUniqueWithoutUserInput | HubFollowUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HubFollowCreateManyUserInputEnvelope
    set?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    disconnect?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    delete?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    connect?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    update?: HubFollowUpdateWithWhereUniqueWithoutUserInput | HubFollowUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HubFollowUpdateManyWithWhereWithoutUserInput | HubFollowUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HubFollowScalarWhereInput | HubFollowScalarWhereInput[]
  }

  export type ClubMembershipUpdateManyWithoutUserNestedInput = {
    create?: XOR<ClubMembershipCreateWithoutUserInput, ClubMembershipUncheckedCreateWithoutUserInput> | ClubMembershipCreateWithoutUserInput[] | ClubMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClubMembershipCreateOrConnectWithoutUserInput | ClubMembershipCreateOrConnectWithoutUserInput[]
    upsert?: ClubMembershipUpsertWithWhereUniqueWithoutUserInput | ClubMembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ClubMembershipCreateManyUserInputEnvelope
    set?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    disconnect?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    delete?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    connect?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    update?: ClubMembershipUpdateWithWhereUniqueWithoutUserInput | ClubMembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ClubMembershipUpdateManyWithWhereWithoutUserInput | ClubMembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ClubMembershipScalarWhereInput | ClubMembershipScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<PostCreateWithoutCreatedByInput, PostUncheckedCreateWithoutCreatedByInput> | PostCreateWithoutCreatedByInput[] | PostUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCreatedByInput | PostCreateOrConnectWithoutCreatedByInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutCreatedByInput | PostUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: PostCreateManyCreatedByInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutCreatedByInput | PostUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: PostUpdateManyWithWhereWithoutCreatedByInput | PostUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<EventCreateWithoutAuthorInput, EventUncheckedCreateWithoutAuthorInput> | EventCreateWithoutAuthorInput[] | EventUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: EventCreateOrConnectWithoutAuthorInput | EventCreateOrConnectWithoutAuthorInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutAuthorInput | EventUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: EventCreateManyAuthorInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutAuthorInput | EventUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: EventUpdateManyWithWhereWithoutAuthorInput | EventUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type RSVPUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RSVPCreateWithoutUserInput, RSVPUncheckedCreateWithoutUserInput> | RSVPCreateWithoutUserInput[] | RSVPUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RSVPCreateOrConnectWithoutUserInput | RSVPCreateOrConnectWithoutUserInput[]
    upsert?: RSVPUpsertWithWhereUniqueWithoutUserInput | RSVPUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RSVPCreateManyUserInputEnvelope
    set?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    disconnect?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    delete?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    connect?: RSVPWhereUniqueInput | RSVPWhereUniqueInput[]
    update?: RSVPUpdateWithWhereUniqueWithoutUserInput | RSVPUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RSVPUpdateManyWithWhereWithoutUserInput | RSVPUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RSVPScalarWhereInput | RSVPScalarWhereInput[]
  }

  export type EventDiscussionThreadUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<EventDiscussionThreadCreateWithoutAuthorInput, EventDiscussionThreadUncheckedCreateWithoutAuthorInput> | EventDiscussionThreadCreateWithoutAuthorInput[] | EventDiscussionThreadUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: EventDiscussionThreadCreateOrConnectWithoutAuthorInput | EventDiscussionThreadCreateOrConnectWithoutAuthorInput[]
    upsert?: EventDiscussionThreadUpsertWithWhereUniqueWithoutAuthorInput | EventDiscussionThreadUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: EventDiscussionThreadCreateManyAuthorInputEnvelope
    set?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    disconnect?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    delete?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    connect?: EventDiscussionThreadWhereUniqueInput | EventDiscussionThreadWhereUniqueInput[]
    update?: EventDiscussionThreadUpdateWithWhereUniqueWithoutAuthorInput | EventDiscussionThreadUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: EventDiscussionThreadUpdateManyWithWhereWithoutAuthorInput | EventDiscussionThreadUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: EventDiscussionThreadScalarWhereInput | EventDiscussionThreadScalarWhereInput[]
  }

  export type EventDiscussionReplyUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<EventDiscussionReplyCreateWithoutAuthorInput, EventDiscussionReplyUncheckedCreateWithoutAuthorInput> | EventDiscussionReplyCreateWithoutAuthorInput[] | EventDiscussionReplyUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: EventDiscussionReplyCreateOrConnectWithoutAuthorInput | EventDiscussionReplyCreateOrConnectWithoutAuthorInput[]
    upsert?: EventDiscussionReplyUpsertWithWhereUniqueWithoutAuthorInput | EventDiscussionReplyUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: EventDiscussionReplyCreateManyAuthorInputEnvelope
    set?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    disconnect?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    delete?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    connect?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    update?: EventDiscussionReplyUpdateWithWhereUniqueWithoutAuthorInput | EventDiscussionReplyUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: EventDiscussionReplyUpdateManyWithWhereWithoutAuthorInput | EventDiscussionReplyUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: EventDiscussionReplyScalarWhereInput | EventDiscussionReplyScalarWhereInput[]
  }

  export type HubFollowUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<HubFollowCreateWithoutUserInput, HubFollowUncheckedCreateWithoutUserInput> | HubFollowCreateWithoutUserInput[] | HubFollowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HubFollowCreateOrConnectWithoutUserInput | HubFollowCreateOrConnectWithoutUserInput[]
    upsert?: HubFollowUpsertWithWhereUniqueWithoutUserInput | HubFollowUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HubFollowCreateManyUserInputEnvelope
    set?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    disconnect?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    delete?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    connect?: HubFollowWhereUniqueInput | HubFollowWhereUniqueInput[]
    update?: HubFollowUpdateWithWhereUniqueWithoutUserInput | HubFollowUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HubFollowUpdateManyWithWhereWithoutUserInput | HubFollowUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HubFollowScalarWhereInput | HubFollowScalarWhereInput[]
  }

  export type ClubMembershipUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ClubMembershipCreateWithoutUserInput, ClubMembershipUncheckedCreateWithoutUserInput> | ClubMembershipCreateWithoutUserInput[] | ClubMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClubMembershipCreateOrConnectWithoutUserInput | ClubMembershipCreateOrConnectWithoutUserInput[]
    upsert?: ClubMembershipUpsertWithWhereUniqueWithoutUserInput | ClubMembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ClubMembershipCreateManyUserInputEnvelope
    set?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    disconnect?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    delete?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    connect?: ClubMembershipWhereUniqueInput | ClubMembershipWhereUniqueInput[]
    update?: ClubMembershipUpdateWithWhereUniqueWithoutUserInput | ClubMembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ClubMembershipUpdateManyWithWhereWithoutUserInput | ClubMembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ClubMembershipScalarWhereInput | ClubMembershipScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutDiscussionThreadsInput = {
    create?: XOR<EventCreateWithoutDiscussionThreadsInput, EventUncheckedCreateWithoutDiscussionThreadsInput>
    connectOrCreate?: EventCreateOrConnectWithoutDiscussionThreadsInput
    connect?: EventWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAuthoredDiscussionThreadsInput = {
    create?: XOR<UserCreateWithoutAuthoredDiscussionThreadsInput, UserUncheckedCreateWithoutAuthoredDiscussionThreadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthoredDiscussionThreadsInput
    connect?: UserWhereUniqueInput
  }

  export type EventDiscussionReplyCreateNestedManyWithoutThreadInput = {
    create?: XOR<EventDiscussionReplyCreateWithoutThreadInput, EventDiscussionReplyUncheckedCreateWithoutThreadInput> | EventDiscussionReplyCreateWithoutThreadInput[] | EventDiscussionReplyUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: EventDiscussionReplyCreateOrConnectWithoutThreadInput | EventDiscussionReplyCreateOrConnectWithoutThreadInput[]
    createMany?: EventDiscussionReplyCreateManyThreadInputEnvelope
    connect?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
  }

  export type EventDiscussionReplyUncheckedCreateNestedManyWithoutThreadInput = {
    create?: XOR<EventDiscussionReplyCreateWithoutThreadInput, EventDiscussionReplyUncheckedCreateWithoutThreadInput> | EventDiscussionReplyCreateWithoutThreadInput[] | EventDiscussionReplyUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: EventDiscussionReplyCreateOrConnectWithoutThreadInput | EventDiscussionReplyCreateOrConnectWithoutThreadInput[]
    createMany?: EventDiscussionReplyCreateManyThreadInputEnvelope
    connect?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EventUpdateOneRequiredWithoutDiscussionThreadsNestedInput = {
    create?: XOR<EventCreateWithoutDiscussionThreadsInput, EventUncheckedCreateWithoutDiscussionThreadsInput>
    connectOrCreate?: EventCreateOrConnectWithoutDiscussionThreadsInput
    upsert?: EventUpsertWithoutDiscussionThreadsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutDiscussionThreadsInput, EventUpdateWithoutDiscussionThreadsInput>, EventUncheckedUpdateWithoutDiscussionThreadsInput>
  }

  export type UserUpdateOneRequiredWithoutAuthoredDiscussionThreadsNestedInput = {
    create?: XOR<UserCreateWithoutAuthoredDiscussionThreadsInput, UserUncheckedCreateWithoutAuthoredDiscussionThreadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthoredDiscussionThreadsInput
    upsert?: UserUpsertWithoutAuthoredDiscussionThreadsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthoredDiscussionThreadsInput, UserUpdateWithoutAuthoredDiscussionThreadsInput>, UserUncheckedUpdateWithoutAuthoredDiscussionThreadsInput>
  }

  export type EventDiscussionReplyUpdateManyWithoutThreadNestedInput = {
    create?: XOR<EventDiscussionReplyCreateWithoutThreadInput, EventDiscussionReplyUncheckedCreateWithoutThreadInput> | EventDiscussionReplyCreateWithoutThreadInput[] | EventDiscussionReplyUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: EventDiscussionReplyCreateOrConnectWithoutThreadInput | EventDiscussionReplyCreateOrConnectWithoutThreadInput[]
    upsert?: EventDiscussionReplyUpsertWithWhereUniqueWithoutThreadInput | EventDiscussionReplyUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: EventDiscussionReplyCreateManyThreadInputEnvelope
    set?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    disconnect?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    delete?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    connect?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    update?: EventDiscussionReplyUpdateWithWhereUniqueWithoutThreadInput | EventDiscussionReplyUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: EventDiscussionReplyUpdateManyWithWhereWithoutThreadInput | EventDiscussionReplyUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: EventDiscussionReplyScalarWhereInput | EventDiscussionReplyScalarWhereInput[]
  }

  export type EventDiscussionReplyUncheckedUpdateManyWithoutThreadNestedInput = {
    create?: XOR<EventDiscussionReplyCreateWithoutThreadInput, EventDiscussionReplyUncheckedCreateWithoutThreadInput> | EventDiscussionReplyCreateWithoutThreadInput[] | EventDiscussionReplyUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: EventDiscussionReplyCreateOrConnectWithoutThreadInput | EventDiscussionReplyCreateOrConnectWithoutThreadInput[]
    upsert?: EventDiscussionReplyUpsertWithWhereUniqueWithoutThreadInput | EventDiscussionReplyUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: EventDiscussionReplyCreateManyThreadInputEnvelope
    set?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    disconnect?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    delete?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    connect?: EventDiscussionReplyWhereUniqueInput | EventDiscussionReplyWhereUniqueInput[]
    update?: EventDiscussionReplyUpdateWithWhereUniqueWithoutThreadInput | EventDiscussionReplyUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: EventDiscussionReplyUpdateManyWithWhereWithoutThreadInput | EventDiscussionReplyUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: EventDiscussionReplyScalarWhereInput | EventDiscussionReplyScalarWhereInput[]
  }

  export type EventDiscussionThreadCreateNestedOneWithoutRepliesInput = {
    create?: XOR<EventDiscussionThreadCreateWithoutRepliesInput, EventDiscussionThreadUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: EventDiscussionThreadCreateOrConnectWithoutRepliesInput
    connect?: EventDiscussionThreadWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAuthoredDiscussionRepliesInput = {
    create?: XOR<UserCreateWithoutAuthoredDiscussionRepliesInput, UserUncheckedCreateWithoutAuthoredDiscussionRepliesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthoredDiscussionRepliesInput
    connect?: UserWhereUniqueInput
  }

  export type EventDiscussionThreadUpdateOneRequiredWithoutRepliesNestedInput = {
    create?: XOR<EventDiscussionThreadCreateWithoutRepliesInput, EventDiscussionThreadUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: EventDiscussionThreadCreateOrConnectWithoutRepliesInput
    upsert?: EventDiscussionThreadUpsertWithoutRepliesInput
    connect?: EventDiscussionThreadWhereUniqueInput
    update?: XOR<XOR<EventDiscussionThreadUpdateToOneWithWhereWithoutRepliesInput, EventDiscussionThreadUpdateWithoutRepliesInput>, EventDiscussionThreadUncheckedUpdateWithoutRepliesInput>
  }

  export type UserUpdateOneRequiredWithoutAuthoredDiscussionRepliesNestedInput = {
    create?: XOR<UserCreateWithoutAuthoredDiscussionRepliesInput, UserUncheckedCreateWithoutAuthoredDiscussionRepliesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthoredDiscussionRepliesInput
    upsert?: UserUpsertWithoutAuthoredDiscussionRepliesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthoredDiscussionRepliesInput, UserUpdateWithoutAuthoredDiscussionRepliesInput>, UserUncheckedUpdateWithoutAuthoredDiscussionRepliesInput>
  }

  export type UserCreateNestedOneWithoutClubMembershipsInput = {
    create?: XOR<UserCreateWithoutClubMembershipsInput, UserUncheckedCreateWithoutClubMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClubMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type ClubCreateNestedOneWithoutMembersInput = {
    create?: XOR<ClubCreateWithoutMembersInput, ClubUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ClubCreateOrConnectWithoutMembersInput
    connect?: ClubWhereUniqueInput
  }

  export type EnumClubRoleFieldUpdateOperationsInput = {
    set?: $Enums.ClubRole
  }

  export type UserUpdateOneRequiredWithoutClubMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutClubMembershipsInput, UserUncheckedCreateWithoutClubMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClubMembershipsInput
    upsert?: UserUpsertWithoutClubMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClubMembershipsInput, UserUpdateWithoutClubMembershipsInput>, UserUncheckedUpdateWithoutClubMembershipsInput>
  }

  export type ClubUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ClubCreateWithoutMembersInput, ClubUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ClubCreateOrConnectWithoutMembersInput
    upsert?: ClubUpsertWithoutMembersInput
    connect?: ClubWhereUniqueInput
    update?: XOR<XOR<ClubUpdateToOneWithWhereWithoutMembersInput, ClubUpdateWithoutMembersInput>, ClubUncheckedUpdateWithoutMembersInput>
  }

  export type UserCreateNestedOneWithoutFollowedHubsInput = {
    create?: XOR<UserCreateWithoutFollowedHubsInput, UserUncheckedCreateWithoutFollowedHubsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowedHubsInput
    connect?: UserWhereUniqueInput
  }

  export type ClubCreateNestedOneWithoutFollowersInput = {
    create?: XOR<ClubCreateWithoutFollowersInput, ClubUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: ClubCreateOrConnectWithoutFollowersInput
    connect?: ClubWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFollowedHubsNestedInput = {
    create?: XOR<UserCreateWithoutFollowedHubsInput, UserUncheckedCreateWithoutFollowedHubsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowedHubsInput
    upsert?: UserUpsertWithoutFollowedHubsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowedHubsInput, UserUpdateWithoutFollowedHubsInput>, UserUncheckedUpdateWithoutFollowedHubsInput>
  }

  export type ClubUpdateOneRequiredWithoutFollowersNestedInput = {
    create?: XOR<ClubCreateWithoutFollowersInput, ClubUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: ClubCreateOrConnectWithoutFollowersInput
    upsert?: ClubUpsertWithoutFollowersInput
    connect?: ClubWhereUniqueInput
    update?: XOR<XOR<ClubUpdateToOneWithWhereWithoutFollowersInput, ClubUpdateWithoutFollowersInput>, ClubUncheckedUpdateWithoutFollowersInput>
  }

  export type ClubCreateNestedOneWithoutBlocksInput = {
    create?: XOR<ClubCreateWithoutBlocksInput, ClubUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: ClubCreateOrConnectWithoutBlocksInput
    connect?: ClubWhereUniqueInput
  }

  export type EnumHubBlockTypeFieldUpdateOperationsInput = {
    set?: $Enums.HubBlockType
  }

  export type ClubUpdateOneRequiredWithoutBlocksNestedInput = {
    create?: XOR<ClubCreateWithoutBlocksInput, ClubUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: ClubCreateOrConnectWithoutBlocksInput
    upsert?: ClubUpsertWithoutBlocksInput
    connect?: ClubWhereUniqueInput
    update?: XOR<XOR<ClubUpdateToOneWithWhereWithoutBlocksInput, ClubUpdateWithoutBlocksInput>, ClubUncheckedUpdateWithoutBlocksInput>
  }

  export type UserCreateNestedOneWithoutRsvpsInput = {
    create?: XOR<UserCreateWithoutRsvpsInput, UserUncheckedCreateWithoutRsvpsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRsvpsInput
    connect?: UserWhereUniqueInput
  }

  export type EventCreateNestedOneWithoutRsvpsInput = {
    create?: XOR<EventCreateWithoutRsvpsInput, EventUncheckedCreateWithoutRsvpsInput>
    connectOrCreate?: EventCreateOrConnectWithoutRsvpsInput
    connect?: EventWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRsvpsNestedInput = {
    create?: XOR<UserCreateWithoutRsvpsInput, UserUncheckedCreateWithoutRsvpsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRsvpsInput
    upsert?: UserUpsertWithoutRsvpsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRsvpsInput, UserUpdateWithoutRsvpsInput>, UserUncheckedUpdateWithoutRsvpsInput>
  }

  export type EventUpdateOneRequiredWithoutRsvpsNestedInput = {
    create?: XOR<EventCreateWithoutRsvpsInput, EventUncheckedCreateWithoutRsvpsInput>
    connectOrCreate?: EventCreateOrConnectWithoutRsvpsInput
    upsert?: EventUpsertWithoutRsvpsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutRsvpsInput, EventUpdateWithoutRsvpsInput>, EventUncheckedUpdateWithoutRsvpsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusFilter<$PrismaModel> | $Enums.EventStatus
  }

  export type NestedEnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumClubRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ClubRole | EnumClubRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumClubRoleFilter<$PrismaModel> | $Enums.ClubRole
  }

  export type NestedEnumClubRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClubRole | EnumClubRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClubRole[] | ListEnumClubRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumClubRoleWithAggregatesFilter<$PrismaModel> | $Enums.ClubRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClubRoleFilter<$PrismaModel>
    _max?: NestedEnumClubRoleFilter<$PrismaModel>
  }

  export type NestedEnumHubBlockTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.HubBlockType | EnumHubBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HubBlockType[] | ListEnumHubBlockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HubBlockType[] | ListEnumHubBlockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHubBlockTypeFilter<$PrismaModel> | $Enums.HubBlockType
  }

  export type NestedEnumHubBlockTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HubBlockType | EnumHubBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HubBlockType[] | ListEnumHubBlockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HubBlockType[] | ListEnumHubBlockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHubBlockTypeWithAggregatesFilter<$PrismaModel> | $Enums.HubBlockType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHubBlockTypeFilter<$PrismaModel>
    _max?: NestedEnumHubBlockTypeFilter<$PrismaModel>
  }

  export type UserCreateWithoutPostsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    authoredEvents?: EventCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    authoredEvents?: EventUncheckedCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPUncheckedCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowUncheckedCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    authoredEvents?: EventUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    authoredEvents?: EventUncheckedUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUncheckedUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUncheckedUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EventCreateWithoutClubInput = {
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutAuthoredEventsInput
    rsvps?: RSVPCreateNestedManyWithoutEventInput
    discussionThreads?: EventDiscussionThreadCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutClubInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    rsvps?: RSVPUncheckedCreateNestedManyWithoutEventInput
    discussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutClubInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutClubInput, EventUncheckedCreateWithoutClubInput>
  }

  export type EventCreateManyClubInputEnvelope = {
    data: EventCreateManyClubInput | EventCreateManyClubInput[]
    skipDuplicates?: boolean
  }

  export type HubFollowCreateWithoutClubInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFollowedHubsInput
  }

  export type HubFollowUncheckedCreateWithoutClubInput = {
    userId: string
    createdAt?: Date | string
  }

  export type HubFollowCreateOrConnectWithoutClubInput = {
    where: HubFollowWhereUniqueInput
    create: XOR<HubFollowCreateWithoutClubInput, HubFollowUncheckedCreateWithoutClubInput>
  }

  export type HubFollowCreateManyClubInputEnvelope = {
    data: HubFollowCreateManyClubInput | HubFollowCreateManyClubInput[]
    skipDuplicates?: boolean
  }

  export type HubBlockCreateWithoutClubInput = {
    type: $Enums.HubBlockType
    title?: string | null
    content: string
    linkUrl?: string | null
    position: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HubBlockUncheckedCreateWithoutClubInput = {
    id?: number
    type: $Enums.HubBlockType
    title?: string | null
    content: string
    linkUrl?: string | null
    position: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HubBlockCreateOrConnectWithoutClubInput = {
    where: HubBlockWhereUniqueInput
    create: XOR<HubBlockCreateWithoutClubInput, HubBlockUncheckedCreateWithoutClubInput>
  }

  export type HubBlockCreateManyClubInputEnvelope = {
    data: HubBlockCreateManyClubInput | HubBlockCreateManyClubInput[]
    skipDuplicates?: boolean
  }

  export type ClubMembershipCreateWithoutClubInput = {
    role: $Enums.ClubRole
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutClubMembershipsInput
  }

  export type ClubMembershipUncheckedCreateWithoutClubInput = {
    userId: string
    role: $Enums.ClubRole
    createdAt?: Date | string
  }

  export type ClubMembershipCreateOrConnectWithoutClubInput = {
    where: ClubMembershipWhereUniqueInput
    create: XOR<ClubMembershipCreateWithoutClubInput, ClubMembershipUncheckedCreateWithoutClubInput>
  }

  export type ClubMembershipCreateManyClubInputEnvelope = {
    data: ClubMembershipCreateManyClubInput | ClubMembershipCreateManyClubInput[]
    skipDuplicates?: boolean
  }

  export type EventUpsertWithWhereUniqueWithoutClubInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutClubInput, EventUncheckedUpdateWithoutClubInput>
    create: XOR<EventCreateWithoutClubInput, EventUncheckedCreateWithoutClubInput>
  }

  export type EventUpdateWithWhereUniqueWithoutClubInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutClubInput, EventUncheckedUpdateWithoutClubInput>
  }

  export type EventUpdateManyWithWhereWithoutClubInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutClubInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: IntFilter<"Event"> | number
    title?: StringFilter<"Event"> | string
    description?: StringFilter<"Event"> | string
    status?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    date?: DateTimeFilter<"Event"> | Date | string
    capacity?: IntFilter<"Event"> | number
    location?: StringFilter<"Event"> | string
    imageUrl?: StringFilter<"Event"> | string
    clubId?: IntFilter<"Event"> | number
    authorId?: StringFilter<"Event"> | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
  }

  export type HubFollowUpsertWithWhereUniqueWithoutClubInput = {
    where: HubFollowWhereUniqueInput
    update: XOR<HubFollowUpdateWithoutClubInput, HubFollowUncheckedUpdateWithoutClubInput>
    create: XOR<HubFollowCreateWithoutClubInput, HubFollowUncheckedCreateWithoutClubInput>
  }

  export type HubFollowUpdateWithWhereUniqueWithoutClubInput = {
    where: HubFollowWhereUniqueInput
    data: XOR<HubFollowUpdateWithoutClubInput, HubFollowUncheckedUpdateWithoutClubInput>
  }

  export type HubFollowUpdateManyWithWhereWithoutClubInput = {
    where: HubFollowScalarWhereInput
    data: XOR<HubFollowUpdateManyMutationInput, HubFollowUncheckedUpdateManyWithoutClubInput>
  }

  export type HubFollowScalarWhereInput = {
    AND?: HubFollowScalarWhereInput | HubFollowScalarWhereInput[]
    OR?: HubFollowScalarWhereInput[]
    NOT?: HubFollowScalarWhereInput | HubFollowScalarWhereInput[]
    userId?: StringFilter<"HubFollow"> | string
    clubId?: IntFilter<"HubFollow"> | number
    createdAt?: DateTimeFilter<"HubFollow"> | Date | string
  }

  export type HubBlockUpsertWithWhereUniqueWithoutClubInput = {
    where: HubBlockWhereUniqueInput
    update: XOR<HubBlockUpdateWithoutClubInput, HubBlockUncheckedUpdateWithoutClubInput>
    create: XOR<HubBlockCreateWithoutClubInput, HubBlockUncheckedCreateWithoutClubInput>
  }

  export type HubBlockUpdateWithWhereUniqueWithoutClubInput = {
    where: HubBlockWhereUniqueInput
    data: XOR<HubBlockUpdateWithoutClubInput, HubBlockUncheckedUpdateWithoutClubInput>
  }

  export type HubBlockUpdateManyWithWhereWithoutClubInput = {
    where: HubBlockScalarWhereInput
    data: XOR<HubBlockUpdateManyMutationInput, HubBlockUncheckedUpdateManyWithoutClubInput>
  }

  export type HubBlockScalarWhereInput = {
    AND?: HubBlockScalarWhereInput | HubBlockScalarWhereInput[]
    OR?: HubBlockScalarWhereInput[]
    NOT?: HubBlockScalarWhereInput | HubBlockScalarWhereInput[]
    id?: IntFilter<"HubBlock"> | number
    clubId?: IntFilter<"HubBlock"> | number
    type?: EnumHubBlockTypeFilter<"HubBlock"> | $Enums.HubBlockType
    title?: StringNullableFilter<"HubBlock"> | string | null
    content?: StringFilter<"HubBlock"> | string
    linkUrl?: StringNullableFilter<"HubBlock"> | string | null
    position?: IntFilter<"HubBlock"> | number
    createdAt?: DateTimeFilter<"HubBlock"> | Date | string
    updatedAt?: DateTimeFilter<"HubBlock"> | Date | string
  }

  export type ClubMembershipUpsertWithWhereUniqueWithoutClubInput = {
    where: ClubMembershipWhereUniqueInput
    update: XOR<ClubMembershipUpdateWithoutClubInput, ClubMembershipUncheckedUpdateWithoutClubInput>
    create: XOR<ClubMembershipCreateWithoutClubInput, ClubMembershipUncheckedCreateWithoutClubInput>
  }

  export type ClubMembershipUpdateWithWhereUniqueWithoutClubInput = {
    where: ClubMembershipWhereUniqueInput
    data: XOR<ClubMembershipUpdateWithoutClubInput, ClubMembershipUncheckedUpdateWithoutClubInput>
  }

  export type ClubMembershipUpdateManyWithWhereWithoutClubInput = {
    where: ClubMembershipScalarWhereInput
    data: XOR<ClubMembershipUpdateManyMutationInput, ClubMembershipUncheckedUpdateManyWithoutClubInput>
  }

  export type ClubMembershipScalarWhereInput = {
    AND?: ClubMembershipScalarWhereInput | ClubMembershipScalarWhereInput[]
    OR?: ClubMembershipScalarWhereInput[]
    NOT?: ClubMembershipScalarWhereInput | ClubMembershipScalarWhereInput[]
    userId?: StringFilter<"ClubMembership"> | string
    clubId?: IntFilter<"ClubMembership"> | number
    role?: EnumClubRoleFilter<"ClubMembership"> | $Enums.ClubRole
    createdAt?: DateTimeFilter<"ClubMembership"> | Date | string
  }

  export type UserCreateWithoutAuthoredEventsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutCreatedByInput
    rsvps?: RSVPCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuthoredEventsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutCreatedByInput
    rsvps?: RSVPUncheckedCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowUncheckedCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuthoredEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthoredEventsInput, UserUncheckedCreateWithoutAuthoredEventsInput>
  }

  export type ClubCreateWithoutEventsInput = {
    name: string
    logoUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    followers?: HubFollowCreateNestedManyWithoutClubInput
    blocks?: HubBlockCreateNestedManyWithoutClubInput
    members?: ClubMembershipCreateNestedManyWithoutClubInput
  }

  export type ClubUncheckedCreateWithoutEventsInput = {
    id?: number
    name: string
    logoUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    followers?: HubFollowUncheckedCreateNestedManyWithoutClubInput
    blocks?: HubBlockUncheckedCreateNestedManyWithoutClubInput
    members?: ClubMembershipUncheckedCreateNestedManyWithoutClubInput
  }

  export type ClubCreateOrConnectWithoutEventsInput = {
    where: ClubWhereUniqueInput
    create: XOR<ClubCreateWithoutEventsInput, ClubUncheckedCreateWithoutEventsInput>
  }

  export type RSVPCreateWithoutEventInput = {
    status?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRsvpsInput
  }

  export type RSVPUncheckedCreateWithoutEventInput = {
    id?: number
    userId: string
    status?: string
    createdAt?: Date | string
  }

  export type RSVPCreateOrConnectWithoutEventInput = {
    where: RSVPWhereUniqueInput
    create: XOR<RSVPCreateWithoutEventInput, RSVPUncheckedCreateWithoutEventInput>
  }

  export type RSVPCreateManyEventInputEnvelope = {
    data: RSVPCreateManyEventInput | RSVPCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type EventDiscussionThreadCreateWithoutEventInput = {
    question: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutAuthoredDiscussionThreadsInput
    replies?: EventDiscussionReplyCreateNestedManyWithoutThreadInput
  }

  export type EventDiscussionThreadUncheckedCreateWithoutEventInput = {
    id?: number
    authorId: string
    question: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: EventDiscussionReplyUncheckedCreateNestedManyWithoutThreadInput
  }

  export type EventDiscussionThreadCreateOrConnectWithoutEventInput = {
    where: EventDiscussionThreadWhereUniqueInput
    create: XOR<EventDiscussionThreadCreateWithoutEventInput, EventDiscussionThreadUncheckedCreateWithoutEventInput>
  }

  export type EventDiscussionThreadCreateManyEventInputEnvelope = {
    data: EventDiscussionThreadCreateManyEventInput | EventDiscussionThreadCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAuthoredEventsInput = {
    update: XOR<UserUpdateWithoutAuthoredEventsInput, UserUncheckedUpdateWithoutAuthoredEventsInput>
    create: XOR<UserCreateWithoutAuthoredEventsInput, UserUncheckedCreateWithoutAuthoredEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthoredEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthoredEventsInput, UserUncheckedUpdateWithoutAuthoredEventsInput>
  }

  export type UserUpdateWithoutAuthoredEventsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutCreatedByNestedInput
    rsvps?: RSVPUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthoredEventsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutCreatedByNestedInput
    rsvps?: RSVPUncheckedUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUncheckedUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ClubUpsertWithoutEventsInput = {
    update: XOR<ClubUpdateWithoutEventsInput, ClubUncheckedUpdateWithoutEventsInput>
    create: XOR<ClubCreateWithoutEventsInput, ClubUncheckedCreateWithoutEventsInput>
    where?: ClubWhereInput
  }

  export type ClubUpdateToOneWithWhereWithoutEventsInput = {
    where?: ClubWhereInput
    data: XOR<ClubUpdateWithoutEventsInput, ClubUncheckedUpdateWithoutEventsInput>
  }

  export type ClubUpdateWithoutEventsInput = {
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followers?: HubFollowUpdateManyWithoutClubNestedInput
    blocks?: HubBlockUpdateManyWithoutClubNestedInput
    members?: ClubMembershipUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateWithoutEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followers?: HubFollowUncheckedUpdateManyWithoutClubNestedInput
    blocks?: HubBlockUncheckedUpdateManyWithoutClubNestedInput
    members?: ClubMembershipUncheckedUpdateManyWithoutClubNestedInput
  }

  export type RSVPUpsertWithWhereUniqueWithoutEventInput = {
    where: RSVPWhereUniqueInput
    update: XOR<RSVPUpdateWithoutEventInput, RSVPUncheckedUpdateWithoutEventInput>
    create: XOR<RSVPCreateWithoutEventInput, RSVPUncheckedCreateWithoutEventInput>
  }

  export type RSVPUpdateWithWhereUniqueWithoutEventInput = {
    where: RSVPWhereUniqueInput
    data: XOR<RSVPUpdateWithoutEventInput, RSVPUncheckedUpdateWithoutEventInput>
  }

  export type RSVPUpdateManyWithWhereWithoutEventInput = {
    where: RSVPScalarWhereInput
    data: XOR<RSVPUpdateManyMutationInput, RSVPUncheckedUpdateManyWithoutEventInput>
  }

  export type RSVPScalarWhereInput = {
    AND?: RSVPScalarWhereInput | RSVPScalarWhereInput[]
    OR?: RSVPScalarWhereInput[]
    NOT?: RSVPScalarWhereInput | RSVPScalarWhereInput[]
    id?: IntFilter<"RSVP"> | number
    userId?: StringFilter<"RSVP"> | string
    eventId?: IntFilter<"RSVP"> | number
    status?: StringFilter<"RSVP"> | string
    createdAt?: DateTimeFilter<"RSVP"> | Date | string
  }

  export type EventDiscussionThreadUpsertWithWhereUniqueWithoutEventInput = {
    where: EventDiscussionThreadWhereUniqueInput
    update: XOR<EventDiscussionThreadUpdateWithoutEventInput, EventDiscussionThreadUncheckedUpdateWithoutEventInput>
    create: XOR<EventDiscussionThreadCreateWithoutEventInput, EventDiscussionThreadUncheckedCreateWithoutEventInput>
  }

  export type EventDiscussionThreadUpdateWithWhereUniqueWithoutEventInput = {
    where: EventDiscussionThreadWhereUniqueInput
    data: XOR<EventDiscussionThreadUpdateWithoutEventInput, EventDiscussionThreadUncheckedUpdateWithoutEventInput>
  }

  export type EventDiscussionThreadUpdateManyWithWhereWithoutEventInput = {
    where: EventDiscussionThreadScalarWhereInput
    data: XOR<EventDiscussionThreadUpdateManyMutationInput, EventDiscussionThreadUncheckedUpdateManyWithoutEventInput>
  }

  export type EventDiscussionThreadScalarWhereInput = {
    AND?: EventDiscussionThreadScalarWhereInput | EventDiscussionThreadScalarWhereInput[]
    OR?: EventDiscussionThreadScalarWhereInput[]
    NOT?: EventDiscussionThreadScalarWhereInput | EventDiscussionThreadScalarWhereInput[]
    id?: IntFilter<"EventDiscussionThread"> | number
    eventId?: IntFilter<"EventDiscussionThread"> | number
    authorId?: StringFilter<"EventDiscussionThread"> | string
    question?: StringFilter<"EventDiscussionThread"> | string
    pinned?: BoolFilter<"EventDiscussionThread"> | boolean
    createdAt?: DateTimeFilter<"EventDiscussionThread"> | Date | string
    updatedAt?: DateTimeFilter<"EventDiscussionThread"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventUncheckedCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPUncheckedCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowUncheckedCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUncheckedUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUncheckedUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUncheckedUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventUncheckedCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPUncheckedCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowUncheckedCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUncheckedUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUncheckedUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUncheckedUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutCreatedByInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUncheckedCreateWithoutCreatedByInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCreateOrConnectWithoutCreatedByInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCreatedByInput, PostUncheckedCreateWithoutCreatedByInput>
  }

  export type PostCreateManyCreatedByInputEnvelope = {
    data: PostCreateManyCreatedByInput | PostCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutAuthorInput = {
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    club: ClubCreateNestedOneWithoutEventsInput
    rsvps?: RSVPCreateNestedManyWithoutEventInput
    discussionThreads?: EventDiscussionThreadCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutAuthorInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    clubId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rsvps?: RSVPUncheckedCreateNestedManyWithoutEventInput
    discussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutAuthorInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutAuthorInput, EventUncheckedCreateWithoutAuthorInput>
  }

  export type EventCreateManyAuthorInputEnvelope = {
    data: EventCreateManyAuthorInput | EventCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type RSVPCreateWithoutUserInput = {
    status?: string
    createdAt?: Date | string
    event: EventCreateNestedOneWithoutRsvpsInput
  }

  export type RSVPUncheckedCreateWithoutUserInput = {
    id?: number
    eventId: number
    status?: string
    createdAt?: Date | string
  }

  export type RSVPCreateOrConnectWithoutUserInput = {
    where: RSVPWhereUniqueInput
    create: XOR<RSVPCreateWithoutUserInput, RSVPUncheckedCreateWithoutUserInput>
  }

  export type RSVPCreateManyUserInputEnvelope = {
    data: RSVPCreateManyUserInput | RSVPCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EventDiscussionThreadCreateWithoutAuthorInput = {
    question: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutDiscussionThreadsInput
    replies?: EventDiscussionReplyCreateNestedManyWithoutThreadInput
  }

  export type EventDiscussionThreadUncheckedCreateWithoutAuthorInput = {
    id?: number
    eventId: number
    question: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: EventDiscussionReplyUncheckedCreateNestedManyWithoutThreadInput
  }

  export type EventDiscussionThreadCreateOrConnectWithoutAuthorInput = {
    where: EventDiscussionThreadWhereUniqueInput
    create: XOR<EventDiscussionThreadCreateWithoutAuthorInput, EventDiscussionThreadUncheckedCreateWithoutAuthorInput>
  }

  export type EventDiscussionThreadCreateManyAuthorInputEnvelope = {
    data: EventDiscussionThreadCreateManyAuthorInput | EventDiscussionThreadCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type EventDiscussionReplyCreateWithoutAuthorInput = {
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
    thread: EventDiscussionThreadCreateNestedOneWithoutRepliesInput
  }

  export type EventDiscussionReplyUncheckedCreateWithoutAuthorInput = {
    id?: number
    threadId: number
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDiscussionReplyCreateOrConnectWithoutAuthorInput = {
    where: EventDiscussionReplyWhereUniqueInput
    create: XOR<EventDiscussionReplyCreateWithoutAuthorInput, EventDiscussionReplyUncheckedCreateWithoutAuthorInput>
  }

  export type EventDiscussionReplyCreateManyAuthorInputEnvelope = {
    data: EventDiscussionReplyCreateManyAuthorInput | EventDiscussionReplyCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type HubFollowCreateWithoutUserInput = {
    createdAt?: Date | string
    club: ClubCreateNestedOneWithoutFollowersInput
  }

  export type HubFollowUncheckedCreateWithoutUserInput = {
    clubId: number
    createdAt?: Date | string
  }

  export type HubFollowCreateOrConnectWithoutUserInput = {
    where: HubFollowWhereUniqueInput
    create: XOR<HubFollowCreateWithoutUserInput, HubFollowUncheckedCreateWithoutUserInput>
  }

  export type HubFollowCreateManyUserInputEnvelope = {
    data: HubFollowCreateManyUserInput | HubFollowCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ClubMembershipCreateWithoutUserInput = {
    role: $Enums.ClubRole
    createdAt?: Date | string
    club: ClubCreateNestedOneWithoutMembersInput
  }

  export type ClubMembershipUncheckedCreateWithoutUserInput = {
    clubId: number
    role: $Enums.ClubRole
    createdAt?: Date | string
  }

  export type ClubMembershipCreateOrConnectWithoutUserInput = {
    where: ClubMembershipWhereUniqueInput
    create: XOR<ClubMembershipCreateWithoutUserInput, ClubMembershipUncheckedCreateWithoutUserInput>
  }

  export type ClubMembershipCreateManyUserInputEnvelope = {
    data: ClubMembershipCreateManyUserInput | ClubMembershipCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type PostUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutCreatedByInput, PostUncheckedUpdateWithoutCreatedByInput>
    create: XOR<PostCreateWithoutCreatedByInput, PostUncheckedCreateWithoutCreatedByInput>
  }

  export type PostUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutCreatedByInput, PostUncheckedUpdateWithoutCreatedByInput>
  }

  export type PostUpdateManyWithWhereWithoutCreatedByInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: IntFilter<"Post"> | number
    name?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    createdById?: StringFilter<"Post"> | string
  }

  export type EventUpsertWithWhereUniqueWithoutAuthorInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutAuthorInput, EventUncheckedUpdateWithoutAuthorInput>
    create: XOR<EventCreateWithoutAuthorInput, EventUncheckedCreateWithoutAuthorInput>
  }

  export type EventUpdateWithWhereUniqueWithoutAuthorInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutAuthorInput, EventUncheckedUpdateWithoutAuthorInput>
  }

  export type EventUpdateManyWithWhereWithoutAuthorInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutAuthorInput>
  }

  export type RSVPUpsertWithWhereUniqueWithoutUserInput = {
    where: RSVPWhereUniqueInput
    update: XOR<RSVPUpdateWithoutUserInput, RSVPUncheckedUpdateWithoutUserInput>
    create: XOR<RSVPCreateWithoutUserInput, RSVPUncheckedCreateWithoutUserInput>
  }

  export type RSVPUpdateWithWhereUniqueWithoutUserInput = {
    where: RSVPWhereUniqueInput
    data: XOR<RSVPUpdateWithoutUserInput, RSVPUncheckedUpdateWithoutUserInput>
  }

  export type RSVPUpdateManyWithWhereWithoutUserInput = {
    where: RSVPScalarWhereInput
    data: XOR<RSVPUpdateManyMutationInput, RSVPUncheckedUpdateManyWithoutUserInput>
  }

  export type EventDiscussionThreadUpsertWithWhereUniqueWithoutAuthorInput = {
    where: EventDiscussionThreadWhereUniqueInput
    update: XOR<EventDiscussionThreadUpdateWithoutAuthorInput, EventDiscussionThreadUncheckedUpdateWithoutAuthorInput>
    create: XOR<EventDiscussionThreadCreateWithoutAuthorInput, EventDiscussionThreadUncheckedCreateWithoutAuthorInput>
  }

  export type EventDiscussionThreadUpdateWithWhereUniqueWithoutAuthorInput = {
    where: EventDiscussionThreadWhereUniqueInput
    data: XOR<EventDiscussionThreadUpdateWithoutAuthorInput, EventDiscussionThreadUncheckedUpdateWithoutAuthorInput>
  }

  export type EventDiscussionThreadUpdateManyWithWhereWithoutAuthorInput = {
    where: EventDiscussionThreadScalarWhereInput
    data: XOR<EventDiscussionThreadUpdateManyMutationInput, EventDiscussionThreadUncheckedUpdateManyWithoutAuthorInput>
  }

  export type EventDiscussionReplyUpsertWithWhereUniqueWithoutAuthorInput = {
    where: EventDiscussionReplyWhereUniqueInput
    update: XOR<EventDiscussionReplyUpdateWithoutAuthorInput, EventDiscussionReplyUncheckedUpdateWithoutAuthorInput>
    create: XOR<EventDiscussionReplyCreateWithoutAuthorInput, EventDiscussionReplyUncheckedCreateWithoutAuthorInput>
  }

  export type EventDiscussionReplyUpdateWithWhereUniqueWithoutAuthorInput = {
    where: EventDiscussionReplyWhereUniqueInput
    data: XOR<EventDiscussionReplyUpdateWithoutAuthorInput, EventDiscussionReplyUncheckedUpdateWithoutAuthorInput>
  }

  export type EventDiscussionReplyUpdateManyWithWhereWithoutAuthorInput = {
    where: EventDiscussionReplyScalarWhereInput
    data: XOR<EventDiscussionReplyUpdateManyMutationInput, EventDiscussionReplyUncheckedUpdateManyWithoutAuthorInput>
  }

  export type EventDiscussionReplyScalarWhereInput = {
    AND?: EventDiscussionReplyScalarWhereInput | EventDiscussionReplyScalarWhereInput[]
    OR?: EventDiscussionReplyScalarWhereInput[]
    NOT?: EventDiscussionReplyScalarWhereInput | EventDiscussionReplyScalarWhereInput[]
    id?: IntFilter<"EventDiscussionReply"> | number
    threadId?: IntFilter<"EventDiscussionReply"> | number
    authorId?: StringFilter<"EventDiscussionReply"> | string
    message?: StringFilter<"EventDiscussionReply"> | string
    createdAt?: DateTimeFilter<"EventDiscussionReply"> | Date | string
    updatedAt?: DateTimeFilter<"EventDiscussionReply"> | Date | string
  }

  export type HubFollowUpsertWithWhereUniqueWithoutUserInput = {
    where: HubFollowWhereUniqueInput
    update: XOR<HubFollowUpdateWithoutUserInput, HubFollowUncheckedUpdateWithoutUserInput>
    create: XOR<HubFollowCreateWithoutUserInput, HubFollowUncheckedCreateWithoutUserInput>
  }

  export type HubFollowUpdateWithWhereUniqueWithoutUserInput = {
    where: HubFollowWhereUniqueInput
    data: XOR<HubFollowUpdateWithoutUserInput, HubFollowUncheckedUpdateWithoutUserInput>
  }

  export type HubFollowUpdateManyWithWhereWithoutUserInput = {
    where: HubFollowScalarWhereInput
    data: XOR<HubFollowUpdateManyMutationInput, HubFollowUncheckedUpdateManyWithoutUserInput>
  }

  export type ClubMembershipUpsertWithWhereUniqueWithoutUserInput = {
    where: ClubMembershipWhereUniqueInput
    update: XOR<ClubMembershipUpdateWithoutUserInput, ClubMembershipUncheckedUpdateWithoutUserInput>
    create: XOR<ClubMembershipCreateWithoutUserInput, ClubMembershipUncheckedCreateWithoutUserInput>
  }

  export type ClubMembershipUpdateWithWhereUniqueWithoutUserInput = {
    where: ClubMembershipWhereUniqueInput
    data: XOR<ClubMembershipUpdateWithoutUserInput, ClubMembershipUncheckedUpdateWithoutUserInput>
  }

  export type ClubMembershipUpdateManyWithWhereWithoutUserInput = {
    where: ClubMembershipScalarWhereInput
    data: XOR<ClubMembershipUpdateManyMutationInput, ClubMembershipUncheckedUpdateManyWithoutUserInput>
  }

  export type EventCreateWithoutDiscussionThreadsInput = {
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutAuthoredEventsInput
    club: ClubCreateNestedOneWithoutEventsInput
    rsvps?: RSVPCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutDiscussionThreadsInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    clubId: number
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    rsvps?: RSVPUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutDiscussionThreadsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutDiscussionThreadsInput, EventUncheckedCreateWithoutDiscussionThreadsInput>
  }

  export type UserCreateWithoutAuthoredDiscussionThreadsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPCreateNestedManyWithoutUserInput
    authoredDiscussionReplies?: EventDiscussionReplyCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuthoredDiscussionThreadsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventUncheckedCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPUncheckedCreateNestedManyWithoutUserInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowUncheckedCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuthoredDiscussionThreadsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthoredDiscussionThreadsInput, UserUncheckedCreateWithoutAuthoredDiscussionThreadsInput>
  }

  export type EventDiscussionReplyCreateWithoutThreadInput = {
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutAuthoredDiscussionRepliesInput
  }

  export type EventDiscussionReplyUncheckedCreateWithoutThreadInput = {
    id?: number
    authorId: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDiscussionReplyCreateOrConnectWithoutThreadInput = {
    where: EventDiscussionReplyWhereUniqueInput
    create: XOR<EventDiscussionReplyCreateWithoutThreadInput, EventDiscussionReplyUncheckedCreateWithoutThreadInput>
  }

  export type EventDiscussionReplyCreateManyThreadInputEnvelope = {
    data: EventDiscussionReplyCreateManyThreadInput | EventDiscussionReplyCreateManyThreadInput[]
    skipDuplicates?: boolean
  }

  export type EventUpsertWithoutDiscussionThreadsInput = {
    update: XOR<EventUpdateWithoutDiscussionThreadsInput, EventUncheckedUpdateWithoutDiscussionThreadsInput>
    create: XOR<EventCreateWithoutDiscussionThreadsInput, EventUncheckedCreateWithoutDiscussionThreadsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutDiscussionThreadsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutDiscussionThreadsInput, EventUncheckedUpdateWithoutDiscussionThreadsInput>
  }

  export type EventUpdateWithoutDiscussionThreadsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutAuthoredEventsNestedInput
    club?: ClubUpdateOneRequiredWithoutEventsNestedInput
    rsvps?: RSVPUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutDiscussionThreadsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clubId?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rsvps?: RSVPUncheckedUpdateManyWithoutEventNestedInput
  }

  export type UserUpsertWithoutAuthoredDiscussionThreadsInput = {
    update: XOR<UserUpdateWithoutAuthoredDiscussionThreadsInput, UserUncheckedUpdateWithoutAuthoredDiscussionThreadsInput>
    create: XOR<UserCreateWithoutAuthoredDiscussionThreadsInput, UserUncheckedCreateWithoutAuthoredDiscussionThreadsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthoredDiscussionThreadsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthoredDiscussionThreadsInput, UserUncheckedUpdateWithoutAuthoredDiscussionThreadsInput>
  }

  export type UserUpdateWithoutAuthoredDiscussionThreadsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUpdateManyWithoutUserNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthoredDiscussionThreadsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUncheckedUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUncheckedUpdateManyWithoutUserNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUncheckedUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EventDiscussionReplyUpsertWithWhereUniqueWithoutThreadInput = {
    where: EventDiscussionReplyWhereUniqueInput
    update: XOR<EventDiscussionReplyUpdateWithoutThreadInput, EventDiscussionReplyUncheckedUpdateWithoutThreadInput>
    create: XOR<EventDiscussionReplyCreateWithoutThreadInput, EventDiscussionReplyUncheckedCreateWithoutThreadInput>
  }

  export type EventDiscussionReplyUpdateWithWhereUniqueWithoutThreadInput = {
    where: EventDiscussionReplyWhereUniqueInput
    data: XOR<EventDiscussionReplyUpdateWithoutThreadInput, EventDiscussionReplyUncheckedUpdateWithoutThreadInput>
  }

  export type EventDiscussionReplyUpdateManyWithWhereWithoutThreadInput = {
    where: EventDiscussionReplyScalarWhereInput
    data: XOR<EventDiscussionReplyUpdateManyMutationInput, EventDiscussionReplyUncheckedUpdateManyWithoutThreadInput>
  }

  export type EventDiscussionThreadCreateWithoutRepliesInput = {
    question: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutDiscussionThreadsInput
    author: UserCreateNestedOneWithoutAuthoredDiscussionThreadsInput
  }

  export type EventDiscussionThreadUncheckedCreateWithoutRepliesInput = {
    id?: number
    eventId: number
    authorId: string
    question: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDiscussionThreadCreateOrConnectWithoutRepliesInput = {
    where: EventDiscussionThreadWhereUniqueInput
    create: XOR<EventDiscussionThreadCreateWithoutRepliesInput, EventDiscussionThreadUncheckedCreateWithoutRepliesInput>
  }

  export type UserCreateWithoutAuthoredDiscussionRepliesInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuthoredDiscussionRepliesInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventUncheckedCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPUncheckedCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowUncheckedCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuthoredDiscussionRepliesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthoredDiscussionRepliesInput, UserUncheckedCreateWithoutAuthoredDiscussionRepliesInput>
  }

  export type EventDiscussionThreadUpsertWithoutRepliesInput = {
    update: XOR<EventDiscussionThreadUpdateWithoutRepliesInput, EventDiscussionThreadUncheckedUpdateWithoutRepliesInput>
    create: XOR<EventDiscussionThreadCreateWithoutRepliesInput, EventDiscussionThreadUncheckedCreateWithoutRepliesInput>
    where?: EventDiscussionThreadWhereInput
  }

  export type EventDiscussionThreadUpdateToOneWithWhereWithoutRepliesInput = {
    where?: EventDiscussionThreadWhereInput
    data: XOR<EventDiscussionThreadUpdateWithoutRepliesInput, EventDiscussionThreadUncheckedUpdateWithoutRepliesInput>
  }

  export type EventDiscussionThreadUpdateWithoutRepliesInput = {
    question?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutDiscussionThreadsNestedInput
    author?: UserUpdateOneRequiredWithoutAuthoredDiscussionThreadsNestedInput
  }

  export type EventDiscussionThreadUncheckedUpdateWithoutRepliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutAuthoredDiscussionRepliesInput = {
    update: XOR<UserUpdateWithoutAuthoredDiscussionRepliesInput, UserUncheckedUpdateWithoutAuthoredDiscussionRepliesInput>
    create: XOR<UserCreateWithoutAuthoredDiscussionRepliesInput, UserUncheckedCreateWithoutAuthoredDiscussionRepliesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthoredDiscussionRepliesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthoredDiscussionRepliesInput, UserUncheckedUpdateWithoutAuthoredDiscussionRepliesInput>
  }

  export type UserUpdateWithoutAuthoredDiscussionRepliesInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthoredDiscussionRepliesInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUncheckedUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUncheckedUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUncheckedUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutClubMembershipsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClubMembershipsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventUncheckedCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPUncheckedCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClubMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClubMembershipsInput, UserUncheckedCreateWithoutClubMembershipsInput>
  }

  export type ClubCreateWithoutMembersInput = {
    name: string
    logoUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutClubInput
    followers?: HubFollowCreateNestedManyWithoutClubInput
    blocks?: HubBlockCreateNestedManyWithoutClubInput
  }

  export type ClubUncheckedCreateWithoutMembersInput = {
    id?: number
    name: string
    logoUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutClubInput
    followers?: HubFollowUncheckedCreateNestedManyWithoutClubInput
    blocks?: HubBlockUncheckedCreateNestedManyWithoutClubInput
  }

  export type ClubCreateOrConnectWithoutMembersInput = {
    where: ClubWhereUniqueInput
    create: XOR<ClubCreateWithoutMembersInput, ClubUncheckedCreateWithoutMembersInput>
  }

  export type UserUpsertWithoutClubMembershipsInput = {
    update: XOR<UserUpdateWithoutClubMembershipsInput, UserUncheckedUpdateWithoutClubMembershipsInput>
    create: XOR<UserCreateWithoutClubMembershipsInput, UserUncheckedCreateWithoutClubMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClubMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClubMembershipsInput, UserUncheckedUpdateWithoutClubMembershipsInput>
  }

  export type UserUpdateWithoutClubMembershipsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClubMembershipsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUncheckedUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUncheckedUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ClubUpsertWithoutMembersInput = {
    update: XOR<ClubUpdateWithoutMembersInput, ClubUncheckedUpdateWithoutMembersInput>
    create: XOR<ClubCreateWithoutMembersInput, ClubUncheckedCreateWithoutMembersInput>
    where?: ClubWhereInput
  }

  export type ClubUpdateToOneWithWhereWithoutMembersInput = {
    where?: ClubWhereInput
    data: XOR<ClubUpdateWithoutMembersInput, ClubUncheckedUpdateWithoutMembersInput>
  }

  export type ClubUpdateWithoutMembersInput = {
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutClubNestedInput
    followers?: HubFollowUpdateManyWithoutClubNestedInput
    blocks?: HubBlockUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateWithoutMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutClubNestedInput
    followers?: HubFollowUncheckedUpdateManyWithoutClubNestedInput
    blocks?: HubBlockUncheckedUpdateManyWithoutClubNestedInput
  }

  export type UserCreateWithoutFollowedHubsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyCreateNestedManyWithoutAuthorInput
    clubMemberships?: ClubMembershipCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFollowedHubsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventUncheckedCreateNestedManyWithoutAuthorInput
    rsvps?: RSVPUncheckedCreateNestedManyWithoutUserInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedCreateNestedManyWithoutAuthorInput
    clubMemberships?: ClubMembershipUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFollowedHubsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowedHubsInput, UserUncheckedCreateWithoutFollowedHubsInput>
  }

  export type ClubCreateWithoutFollowersInput = {
    name: string
    logoUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutClubInput
    blocks?: HubBlockCreateNestedManyWithoutClubInput
    members?: ClubMembershipCreateNestedManyWithoutClubInput
  }

  export type ClubUncheckedCreateWithoutFollowersInput = {
    id?: number
    name: string
    logoUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutClubInput
    blocks?: HubBlockUncheckedCreateNestedManyWithoutClubInput
    members?: ClubMembershipUncheckedCreateNestedManyWithoutClubInput
  }

  export type ClubCreateOrConnectWithoutFollowersInput = {
    where: ClubWhereUniqueInput
    create: XOR<ClubCreateWithoutFollowersInput, ClubUncheckedCreateWithoutFollowersInput>
  }

  export type UserUpsertWithoutFollowedHubsInput = {
    update: XOR<UserUpdateWithoutFollowedHubsInput, UserUncheckedUpdateWithoutFollowedHubsInput>
    create: XOR<UserCreateWithoutFollowedHubsInput, UserUncheckedCreateWithoutFollowedHubsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowedHubsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowedHubsInput, UserUncheckedUpdateWithoutFollowedHubsInput>
  }

  export type UserUpdateWithoutFollowedHubsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUpdateManyWithoutAuthorNestedInput
    clubMemberships?: ClubMembershipUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowedHubsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUncheckedUpdateManyWithoutAuthorNestedInput
    rsvps?: RSVPUncheckedUpdateManyWithoutUserNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedUpdateManyWithoutAuthorNestedInput
    clubMemberships?: ClubMembershipUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ClubUpsertWithoutFollowersInput = {
    update: XOR<ClubUpdateWithoutFollowersInput, ClubUncheckedUpdateWithoutFollowersInput>
    create: XOR<ClubCreateWithoutFollowersInput, ClubUncheckedCreateWithoutFollowersInput>
    where?: ClubWhereInput
  }

  export type ClubUpdateToOneWithWhereWithoutFollowersInput = {
    where?: ClubWhereInput
    data: XOR<ClubUpdateWithoutFollowersInput, ClubUncheckedUpdateWithoutFollowersInput>
  }

  export type ClubUpdateWithoutFollowersInput = {
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutClubNestedInput
    blocks?: HubBlockUpdateManyWithoutClubNestedInput
    members?: ClubMembershipUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateWithoutFollowersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutClubNestedInput
    blocks?: HubBlockUncheckedUpdateManyWithoutClubNestedInput
    members?: ClubMembershipUncheckedUpdateManyWithoutClubNestedInput
  }

  export type ClubCreateWithoutBlocksInput = {
    name: string
    logoUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutClubInput
    followers?: HubFollowCreateNestedManyWithoutClubInput
    members?: ClubMembershipCreateNestedManyWithoutClubInput
  }

  export type ClubUncheckedCreateWithoutBlocksInput = {
    id?: number
    name: string
    logoUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutClubInput
    followers?: HubFollowUncheckedCreateNestedManyWithoutClubInput
    members?: ClubMembershipUncheckedCreateNestedManyWithoutClubInput
  }

  export type ClubCreateOrConnectWithoutBlocksInput = {
    where: ClubWhereUniqueInput
    create: XOR<ClubCreateWithoutBlocksInput, ClubUncheckedCreateWithoutBlocksInput>
  }

  export type ClubUpsertWithoutBlocksInput = {
    update: XOR<ClubUpdateWithoutBlocksInput, ClubUncheckedUpdateWithoutBlocksInput>
    create: XOR<ClubCreateWithoutBlocksInput, ClubUncheckedCreateWithoutBlocksInput>
    where?: ClubWhereInput
  }

  export type ClubUpdateToOneWithWhereWithoutBlocksInput = {
    where?: ClubWhereInput
    data: XOR<ClubUpdateWithoutBlocksInput, ClubUncheckedUpdateWithoutBlocksInput>
  }

  export type ClubUpdateWithoutBlocksInput = {
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutClubNestedInput
    followers?: HubFollowUpdateManyWithoutClubNestedInput
    members?: ClubMembershipUpdateManyWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateWithoutBlocksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutClubNestedInput
    followers?: HubFollowUncheckedUpdateManyWithoutClubNestedInput
    members?: ClubMembershipUncheckedUpdateManyWithoutClubNestedInput
  }

  export type UserCreateWithoutRsvpsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventCreateNestedManyWithoutAuthorInput
    authoredDiscussionThreads?: EventDiscussionThreadCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRsvpsInput = {
    role?: $Enums.Role
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutCreatedByInput
    authoredEvents?: EventUncheckedCreateNestedManyWithoutAuthorInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutAuthorInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedCreateNestedManyWithoutAuthorInput
    followedHubs?: HubFollowUncheckedCreateNestedManyWithoutUserInput
    clubMemberships?: ClubMembershipUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRsvpsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRsvpsInput, UserUncheckedCreateWithoutRsvpsInput>
  }

  export type EventCreateWithoutRsvpsInput = {
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutAuthoredEventsInput
    club: ClubCreateNestedOneWithoutEventsInput
    discussionThreads?: EventDiscussionThreadCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutRsvpsInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    clubId: number
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    discussionThreads?: EventDiscussionThreadUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutRsvpsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutRsvpsInput, EventUncheckedCreateWithoutRsvpsInput>
  }

  export type UserUpsertWithoutRsvpsInput = {
    update: XOR<UserUpdateWithoutRsvpsInput, UserUncheckedUpdateWithoutRsvpsInput>
    create: XOR<UserCreateWithoutRsvpsInput, UserUncheckedCreateWithoutRsvpsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRsvpsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRsvpsInput, UserUncheckedUpdateWithoutRsvpsInput>
  }

  export type UserUpdateWithoutRsvpsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUpdateManyWithoutAuthorNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRsvpsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutCreatedByNestedInput
    authoredEvents?: EventUncheckedUpdateManyWithoutAuthorNestedInput
    authoredDiscussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutAuthorNestedInput
    authoredDiscussionReplies?: EventDiscussionReplyUncheckedUpdateManyWithoutAuthorNestedInput
    followedHubs?: HubFollowUncheckedUpdateManyWithoutUserNestedInput
    clubMemberships?: ClubMembershipUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EventUpsertWithoutRsvpsInput = {
    update: XOR<EventUpdateWithoutRsvpsInput, EventUncheckedUpdateWithoutRsvpsInput>
    create: XOR<EventCreateWithoutRsvpsInput, EventUncheckedCreateWithoutRsvpsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutRsvpsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutRsvpsInput, EventUncheckedUpdateWithoutRsvpsInput>
  }

  export type EventUpdateWithoutRsvpsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutAuthoredEventsNestedInput
    club?: ClubUpdateOneRequiredWithoutEventsNestedInput
    discussionThreads?: EventDiscussionThreadUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutRsvpsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clubId?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyClubInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HubFollowCreateManyClubInput = {
    userId: string
    createdAt?: Date | string
  }

  export type HubBlockCreateManyClubInput = {
    id?: number
    type: $Enums.HubBlockType
    title?: string | null
    content: string
    linkUrl?: string | null
    position: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClubMembershipCreateManyClubInput = {
    userId: string
    role: $Enums.ClubRole
    createdAt?: Date | string
  }

  export type EventUpdateWithoutClubInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutAuthoredEventsNestedInput
    rsvps?: RSVPUpdateManyWithoutEventNestedInput
    discussionThreads?: EventDiscussionThreadUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutClubInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rsvps?: RSVPUncheckedUpdateManyWithoutEventNestedInput
    discussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutClubInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubFollowUpdateWithoutClubInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFollowedHubsNestedInput
  }

  export type HubFollowUncheckedUpdateWithoutClubInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubFollowUncheckedUpdateManyWithoutClubInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubBlockUpdateWithoutClubInput = {
    type?: EnumHubBlockTypeFieldUpdateOperationsInput | $Enums.HubBlockType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubBlockUncheckedUpdateWithoutClubInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumHubBlockTypeFieldUpdateOperationsInput | $Enums.HubBlockType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubBlockUncheckedUpdateManyWithoutClubInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumHubBlockTypeFieldUpdateOperationsInput | $Enums.HubBlockType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubMembershipUpdateWithoutClubInput = {
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClubMembershipsNestedInput
  }

  export type ClubMembershipUncheckedUpdateWithoutClubInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubMembershipUncheckedUpdateManyWithoutClubInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RSVPCreateManyEventInput = {
    id?: number
    userId: string
    status?: string
    createdAt?: Date | string
  }

  export type EventDiscussionThreadCreateManyEventInput = {
    id?: number
    authorId: string
    question: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RSVPUpdateWithoutEventInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRsvpsNestedInput
  }

  export type RSVPUncheckedUpdateWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RSVPUncheckedUpdateManyWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDiscussionThreadUpdateWithoutEventInput = {
    question?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutAuthoredDiscussionThreadsNestedInput
    replies?: EventDiscussionReplyUpdateManyWithoutThreadNestedInput
  }

  export type EventDiscussionThreadUncheckedUpdateWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: EventDiscussionReplyUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type EventDiscussionThreadUncheckedUpdateManyWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type PostCreateManyCreatedByInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventCreateManyAuthorInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.EventStatus
    date: Date | string
    capacity: number
    location: string
    imageUrl: string
    clubId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RSVPCreateManyUserInput = {
    id?: number
    eventId: number
    status?: string
    createdAt?: Date | string
  }

  export type EventDiscussionThreadCreateManyAuthorInput = {
    id?: number
    eventId: number
    question: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDiscussionReplyCreateManyAuthorInput = {
    id?: number
    threadId: number
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HubFollowCreateManyUserInput = {
    clubId: number
    createdAt?: Date | string
  }

  export type ClubMembershipCreateManyUserInput = {
    clubId: number
    role: $Enums.ClubRole
    createdAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUpdateWithoutCreatedByInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutEventsNestedInput
    rsvps?: RSVPUpdateManyWithoutEventNestedInput
    discussionThreads?: EventDiscussionThreadUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clubId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rsvps?: RSVPUncheckedUpdateManyWithoutEventNestedInput
    discussionThreads?: EventDiscussionThreadUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clubId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RSVPUpdateWithoutUserInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutRsvpsNestedInput
  }

  export type RSVPUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RSVPUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDiscussionThreadUpdateWithoutAuthorInput = {
    question?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutDiscussionThreadsNestedInput
    replies?: EventDiscussionReplyUpdateManyWithoutThreadNestedInput
  }

  export type EventDiscussionThreadUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: EventDiscussionReplyUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type EventDiscussionThreadUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDiscussionReplyUpdateWithoutAuthorInput = {
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thread?: EventDiscussionThreadUpdateOneRequiredWithoutRepliesNestedInput
  }

  export type EventDiscussionReplyUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    threadId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDiscussionReplyUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    threadId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubFollowUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type HubFollowUncheckedUpdateWithoutUserInput = {
    clubId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HubFollowUncheckedUpdateManyWithoutUserInput = {
    clubId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubMembershipUpdateWithoutUserInput = {
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    club?: ClubUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ClubMembershipUncheckedUpdateWithoutUserInput = {
    clubId?: IntFieldUpdateOperationsInput | number
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubMembershipUncheckedUpdateManyWithoutUserInput = {
    clubId?: IntFieldUpdateOperationsInput | number
    role?: EnumClubRoleFieldUpdateOperationsInput | $Enums.ClubRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDiscussionReplyCreateManyThreadInput = {
    id?: number
    authorId: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventDiscussionReplyUpdateWithoutThreadInput = {
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutAuthoredDiscussionRepliesNestedInput
  }

  export type EventDiscussionReplyUncheckedUpdateWithoutThreadInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDiscussionReplyUncheckedUpdateManyWithoutThreadInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}