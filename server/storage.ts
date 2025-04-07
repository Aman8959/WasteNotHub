import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  agents, type Agent, type InsertAgent,
  donations, type Donation, type InsertDonation
} from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import MemoryStore from "memorystore";
import { db } from './db';
import { eq } from 'drizzle-orm';

// Interface for all CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product operations
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Agent operations
  getAgents(): Promise<Agent[]>;
  getAgentById(id: number): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  
  // Donation operations
  getDonations(): Promise<Donation[]>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  
  // Session store
  sessionStore: session.Store;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private agents: Map<number, Agent>;
  private donations: Map<number, Donation>;
  private userId: number;
  private productId: number;
  private agentId: number;
  private donationId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.agents = new Map();
    this.donations = new Map();
    this.userId = 1;
    this.productId = 1;
    this.agentId = 1;
    this.donationId = 1;
    
    // Create memory session store
    const MemorySessionStore = MemoryStore(session);
    this.sessionStore = new MemorySessionStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Initialize with sample data
    this.seedSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const created_at = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      created_at,
      name: insertUser.name || null
    };
    this.users.set(id, user);
    return user;
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category,
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const created_at = new Date();
    const is_available = true;
    const product: Product = { ...insertProduct, id, is_available, created_at };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, productUpdate: Partial<Product>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;
    
    const updatedProduct = { ...existingProduct, ...productUpdate };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Agent operations
  async getAgents(): Promise<Agent[]> {
    return Array.from(this.agents.values());
  }

  async getAgentById(id: number): Promise<Agent | undefined> {
    return this.agents.get(id);
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const id = this.agentId++;
    const created_at = new Date();
    const agent: Agent = { ...insertAgent, id, created_at };
    this.agents.set(id, agent);
    return agent;
  }

  // Donation operations
  async getDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }

  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = this.donationId++;
    const created_at = new Date();
    const donation: Donation = { ...insertDonation, id, created_at };
    this.donations.set(id, donation);
    return donation;
  }

  // Seed sample data for development
  private seedSampleData() {
    // Sample users
    const user1: User = {
      id: this.userId++,
      username: 'johndoe',
      password: 'hashed_password',
      email: 'john@example.com',
      name: 'John Doe',
      created_at: new Date()
    };
    this.users.set(user1.id, user1);

    // Sample products
    const products = [
      {
        name: 'Modern Wooden Chair',
        description: 'Lightly used wooden chair, perfect for a home office or dining room.',
        category: 'Furniture',
        donor_id: user1.id,
        image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
        is_available: true
      },
      {
        name: 'Coffee Maker',
        description: 'Working coffee maker, only 1 year old. Makes great coffee!',
        category: 'Kitchen',
        donor_id: user1.id,
        image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed',
        is_available: true
      },
      {
        name: 'Refurbished Laptop',
        description: 'Working laptop with new battery. Great for basic tasks and browsing.',
        category: 'Electronics',
        donor_id: user1.id,
        image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302',
        is_available: true
      },
      {
        name: 'Fiction Book Collection',
        description: 'Collection of 15 contemporary fiction novels in good condition.',
        category: 'Books',
        donor_id: user1.id,
        image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
        is_available: true
      }
    ];

    products.forEach(product => {
      const id = this.productId++;
      const created_at = new Date();
      this.products.set(id, { ...product, id, created_at });
    });

    // Sample agents
    const agents = [
      {
        name: 'Sarah Johnson',
        area: 'Downtown Area',
        rating: 4.5,
        bio: 'Sarah has been volunteering with us for 3 years and has helped distribute over 500 items to those in need.',
        image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        user_id: user1.id
      },
      {
        name: 'Michael Rodriguez',
        area: 'West Side',
        rating: 4.0,
        bio: 'Michael joined our team last year and specializes in furniture and large item pickups and deliveries.',
        image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        user_id: user1.id
      },
      {
        name: 'Aisha Patel',
        area: 'North District',
        rating: 5.0,
        bio: 'Aisha coordinates our clothing and small item distribution network and works with local shelters.',
        image_url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e',
        user_id: user1.id
      }
    ];

    agents.forEach(agent => {
      const id = this.agentId++;
      const created_at = new Date();
      this.agents.set(id, { ...agent, id, created_at });
    });
  }
}

const MemorySessionStore = MemoryStore(session);

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    // Use memory session store for now
    this.sessionStore = new MemorySessionStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // When using Postgres for sessions:
    // this.sessionStore = new PostgresSessionStore({
    //   conObject: {
    //     connectionString: process.env.DATABASE_URL,
    //   },
    //   createTableIfMissing: true,
    // });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({
      ...insertUser,
      name: insertUser.name || null
    }).returning();
    return user;
  }
  
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values({
      ...insertProduct, 
      is_available: true,
      donor_id: insertProduct.donor_id || null,
      image_url: insertProduct.image_url || null
    }).returning();
    return product;
  }
  
  async updateProduct(id: number, productUpdate: Partial<Product>): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set(productUpdate)
      .where(eq(products.id, id))
      .returning();
    return product;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return !!result;
  }
  
  async getAgents(): Promise<Agent[]> {
    return await db.select().from(agents);
  }
  
  async getAgentById(id: number): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent;
  }
  
  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const [agent] = await db.insert(agents).values({
      ...insertAgent,
      image_url: insertAgent.image_url || null,
      rating: insertAgent.rating || null,
      bio: insertAgent.bio || null,
      user_id: insertAgent.user_id || null
    }).returning();
    return agent;
  }
  
  async getDonations(): Promise<Donation[]> {
    return await db.select().from(donations);
  }
  
  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const [donation] = await db.insert(donations).values({
      ...insertDonation,
      message: insertDonation.message || null
    }).returning();
    return donation;
  }
}

// Use Database storage
export const storage = new DatabaseStorage();
