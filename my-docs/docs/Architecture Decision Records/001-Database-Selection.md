---
title: Database Selection
status: Accepted
date: 2023-10-01
sidebar_position: 2
---

# Database Selection

## Context

The project requires a database to store financial data. Key requirements include:

- High availability and scalability.
- Support for complex queries.
- ACID compliance for transactional integrity.

## Decision

We have decided to use PostgreSQL as the primary database for the project.

## Consequences

- **Positive**:
  - Mature and widely supported database.
  - Strong support for ACID transactions.
  - Scalable with extensions like `pg_partman` for partitioning.
- **Negative**:
  - Requires expertise in PostgreSQL for optimization.
  - May need additional tools for horizontal scaling.

## Alternatives Considered

1. **MySQL**:
   - Pros: Simple to use, widely adopted.
   - Cons: Limited support for advanced features like JSON indexing.
2. **MongoDB**:
   - Pros: Flexible schema, good for unstructured data.
   - Cons: Lacks ACID compliance for complex transactions.

## References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Comparison of Relational Databases](#)
