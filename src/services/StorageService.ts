import SQLite, {
  SQLResultSet,
  SQLTransaction,
  WebsqlDatabase,
} from 'react-native-sqlite-2';
import moment from 'moment';

const TRIPS_TABLE_NAME = 'trips';
const TRIP_EXPENSES_TABLE_NAME = 'trip_expenses';
const KEY_ID = 'id';
const KEY_TRIP_ID = 'trip_id';
const KEY_NAME = 'name';
const KEY_DESCRIPTION = 'description';
const KEY_DESTINATION = 'destination';
const KEY_COST = 'cost';
const KEY_CATEGORY = 'category';
const KEY_DATE = 'date';
const KEY_RISK_ASSESSMENT = 'risk_assessment';
const KEY_BUDGET = 'budget';

export class StorageService {
  static db: WebsqlDatabase;

  static async register() {
    this.db = SQLite.openDatabase('my.db', '1.0', '', 1);
    await this.initDb();
  }

  static async initDb() {
    await this.doQuery(
      `CREATE TABLE IF NOT EXISTS ${TRIPS_TABLE_NAME}(${KEY_ID} INTEGER PRIMARY KEY, ${KEY_NAME} TEXT, ${KEY_DESCRIPTION} TEXT, ${KEY_DESTINATION} TEXT, ${KEY_DATE} TEXT, ${KEY_RISK_ASSESSMENT} TEXT, ${KEY_BUDGET} INTEGER)`,
    );
    await this.doQuery(
      `CREATE TABLE IF NOT EXISTS ${TRIP_EXPENSES_TABLE_NAME}(${KEY_ID} INTEGER PRIMARY KEY, ${KEY_TRIP_ID} INTEGER, ${KEY_NAME} TEXT, ${KEY_DESCRIPTION} TEXT, ${KEY_CATEGORY} TEXT, ${KEY_DATE} TEXT, ${KEY_COST} INTEGER)`,
    );
  }

  static async getAllTrips(query: string) {
    const list: Trip[] = [];
    const results = await this.doQuery(
      `SELECT * FROM ${TRIPS_TABLE_NAME} WHERE instr(${KEY_NAME}, ?)`,
      [query],
    );
    if (results.rows) {
      for (let i = 0; i < results.rows.length; ++i) {
        list.push(results.rows.item(i));
      }
    }
    return list;
  }
  static async getTrip(tripId: string | number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tx, results] = await this.doQuery(
      `SELECT * FROM ${TRIPS_TABLE_NAME} WHERE id = ?`,
      [tripId.toString()],
    );
    if (results.rows && results.rows.length >= 0) {
      return results.rows.item(0);
    } else {
      throw new Error('Trip unavailable');
    }
  }
  static async getAllExpenses() {
    const list: Expense[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tx, results] = await this.doQuery(
      `SELECT * FROM ${TRIP_EXPENSES_TABLE_NAME} WHERE 1`,
    );
    if (results.rows) {
      for (let i = 0; i < results.rows.length; ++i) {
        list.push(results.rows.item(i));
      }
    }
    return list;
  }
  static async getTripExpenses(tripId: string | number) {
    const list: Expense[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tx, results] = await this.doQuery(
      `SELECT * FROM ${TRIP_EXPENSES_TABLE_NAME} WHERE ${KEY_TRIP_ID} = ?`,
      [tripId.toString()],
    );
    if (results.rows) {
      for (let i = 0; i < results.rows.length; ++i) {
        list.push(results.rows.item(i));
      }
    }
    return list;
  }
  static async addTrip(trip: Trip) {
    return this.doQuery(
      `INSERT INTO ${TRIPS_TABLE_NAME}
            (${KEY_NAME}, ${KEY_DATE}, ${KEY_DESCRIPTION}, ${KEY_DESTINATION}, ${KEY_RISK_ASSESSMENT}, ${KEY_BUDGET})
            VALUES (?,?,?,?,?,?)`,
      [
        trip.name,
        trip.date,
        trip.description,
        trip.destination,
        trip.requiresRiskAssessment ? 'YES' : 'NO',
        trip.budget.toString(),
      ],
    );
  }
  static async addTripExpense(expense: Expense) {}

  static doQuery(query: string, args: string[] = []): Promise<any> {
    return new Promise(async resolve => {
      this.db.transaction(async tx => {
        tx.executeSql(
          query,
          args,
          (_tx: SQLTransaction, results: SQLResultSet) => resolve(results),
        );
      });
    });
  }
}
